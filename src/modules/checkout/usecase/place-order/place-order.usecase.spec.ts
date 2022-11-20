import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../../store-catalog/domain/product-entity";
import { PlaceOrderInputDto } from "./place-order.dto";
import PlaceOrderUsecase from "./place-order.usecase";

const mockDate = new Date(2000, 1, 1);

describe("PlaceOrderUseCase unit test", () => {

    describe("validateProducts method", () => {
        //@ts-expect-error - no params in constructor
        const placeOrderUseCase = new PlaceOrderUsecase();

        it("should throw error if not products are selected", async () => {
            const input: PlaceOrderInputDto = {
                clientId: "1",
                products: [],
            };

            await expect(placeOrderUseCase['validateProducts'](input)).rejects.toThrow(
                new Error("No products selected")
            );

        });

        it("should an error when products are not available in stock", async() => {
            const mockProductFacade = {
                checkStock: jest.fn(({productId}: {productId: string}) => 
                    Promise.resolve({
                        productId,
                        stock: productId === "1" ? 0 : 1,
                    })
                ),
            };

            //@ts-expect-error - force set productFacade
            placeOrderUseCase["_productFacade"] = mockProductFacade;

            let input: PlaceOrderInputDto = {
                clientId: "0",
                products: [{productId: "1"}]
            }

            await expect(placeOrderUseCase['validateProducts'](input)).rejects.toThrow(
                new Error("Product 1 is not available in stock")
            );

            input = {
                clientId: "0",
                products: [{productId: "0"}, {productId: "1"}]
            };

            await expect(placeOrderUseCase['validateProducts'](input)).rejects.toThrow(
                new Error("Product 1 is not available in stock")
            );
            expect(mockProductFacade.checkStock).toHaveBeenCalledTimes(3);

            input = {
                clientId: "0",
                products: [{productId: "0"}, {productId: "1"}, {productId: "2"}]
            };

            await expect(placeOrderUseCase['validateProducts'](input)).rejects.toThrow(
                new Error("Product 1 is not available in stock")
            );
            expect(mockProductFacade.checkStock).toHaveBeenCalledTimes(5);
        });

    });

    describe("getProducst method", () => {
        beforeAll(() => {
            jest.useFakeTimers("modern");
            jest.setSystemTime(mockDate);
        });

        afterAll(() => {
            jest.useRealTimers();
        });

        //@ts-expect-error - no params in constructor
        const placeOrderUseCase = new PlaceOrderUsecase();

        it("should throw an error when product not found", async () => {
            const mockCatalogFacade = {
                find: jest.fn().mockResolvedValue(null)
            };

            //@ts-expect-error - force set catalogFacade
            placeOrderUseCase["_catalogFacade"] = mockCatalogFacade;

            await expect(placeOrderUseCase["getProduct"]("0")).rejects.toThrow(
                new Error("Product not found")
            );
        });

        it("should return a product", async () => {
            const productInMock = {id: "1", name: "Product 1", description: "Product description", salesPrice: 100};
            const mockCatalogFacade = {
                find: jest.fn().mockResolvedValue(productInMock)
            };

            //@ts-expect-error - force set catalogFacade
            placeOrderUseCase["_catalogFacade"] = mockCatalogFacade;

            const product = await placeOrderUseCase["getProduct"]("1");
            
            expect(product.id.id).toBe(productInMock.id);
            expect(product.name).toBe(productInMock.name);
            expect(product.description).toBe(productInMock.description);
            expect(product.salesPrice).toBe(productInMock.salesPrice);
            expect(mockCatalogFacade.find).toHaveBeenCalledTimes(1);
        });
    });

    describe("execute method", () => {
        beforeAll(() => {
            jest.useFakeTimers("modern");
            jest.setSystemTime(mockDate);
        });

        afterAll(() => {
            jest.useRealTimers();
        });

        it("should throw an error when client not found", async () => {
            
            const mockClientFacade = {
                find: jest.fn().mockResolvedValue(null)
            };
            //@ts-expect-error - no params in constructor
            const placeOrderUseCase = new PlaceOrderUsecase();
            //@ts-expect-error - force set clientFacade
            placeOrderUseCase["_clientFacade"] = mockClientFacade;

            const input: PlaceOrderInputDto = {clientId: "0", products: []}

            await expect(placeOrderUseCase.execute(input)).rejects.toThrow(
                new Error("Client not found")
            );
        });

        it("should throw an error when products are not valid", async () => {
            
            const mockClientFacade = {
                find: jest.fn().mockResolvedValue(true)
            };
            //@ts-expect-error - no params in constructor
            const placeOrderUseCase = new PlaceOrderUsecase();
            
            const mockValidateProducts = jest
                //@ts-expect-error - spy on private method
                .spyOn(placeOrderUseCase, "validateProducts")
                //@ts-expect-error - not return never
                .mockRejectedValue(new Error("No products selected"));

            //@ts-expect-error - force set clientFacade
            placeOrderUseCase["_clientFacade"] = mockClientFacade;

            const input: PlaceOrderInputDto = {clientId: "1", products: []};
            await expect(placeOrderUseCase.execute(input)).rejects.toThrow(
                new Error("No products selected")
            );
            expect(mockValidateProducts).toHaveBeenCalledTimes(1);
        });
    
        describe("place an order", () => {
            const clientProps = {
                id: "1",
                name: "Client 1",
                document: "Document",
                email: "x@x.com",
                address: "Rua 1",
                street: "Street 1",
                number: "Number 1",
                complement: "",
                city: "City 1",
                state: "State 1",
                zipCode: "000"
            }

            const mockClientFacade = {
                find: jest.fn().mockResolvedValue(clientProps)
            };

            const mockPaymentFacade = {
                process: jest.fn(),
            }

            const mockCheckoutRepository = {
                addOrder: jest.fn(),
            }

            const mockInvoiceFacade = {
                createInvoice: jest.fn().mockResolvedValue({id: "1i"}),
            }

            const placeOrderUseCase = new PlaceOrderUsecase(
                mockClientFacade as any,
                null,
                null,
                mockCheckoutRepository as any,
                mockInvoiceFacade  as any,
                mockPaymentFacade  as any
            );

            const products = {
                "1": new Product({
                id: new Id("1"),
                name: "Product 1",
                description: "Description 1",
                salesPrice: 50
            }),
            "2": new Product({
                id: new Id("2"),
                name: "Product 2",
                description: "Description 2",
                salesPrice: 20
            })};

            const mockValidateProducts = jest
            //@ts-expect-error - spy on private method
            .spyOn(placeOrderUseCase, "validateProducts")
            //@ts-expect-error - spy on private method
            .mockResolvedValue(null);

            const mockGetroducts = jest
            //@ts-expect-error - spy on private method
            .spyOn(placeOrderUseCase, "getProduct")
            //@ts-expect-error - not return never
            .mockImplementation((productId: keyof typeof products) => {
                return products[productId];
            });

            it("should not be approved", async () => {
                mockPaymentFacade.process = mockPaymentFacade.process.mockReturnValue({
                    transactionId: "1t",
                    orderId: "1o",
                    amount: 100,
                    status: "error",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                });

                const input: PlaceOrderInputDto = {
                    clientId: "1c",
                    products: [{productId: "1"}, {productId: "2"}]
                }

                let output = await placeOrderUseCase.execute(input);

                expect(output.invoiceId).toBeNull();
                expect(output.total).toBe(70);
                expect(output.products).toStrictEqual([
                    {productId: "1"},
                    {productId: "2"},
                ]);
                expect(mockClientFacade.find).toHaveBeenCalledTimes(1);
                expect(mockClientFacade.find).toHaveBeenCalledWith({id: "1c"});
                expect(mockValidateProducts).toHaveBeenCalledTimes(1);
                expect(mockValidateProducts).toHaveBeenCalledWith(input);
                expect(mockGetroducts).toHaveBeenCalledTimes(2);
                expect(mockCheckoutRepository.addOrder).toHaveBeenCalledTimes(1);
                expect(mockPaymentFacade.process).toHaveBeenCalledTimes(1);
                expect(mockPaymentFacade.process).toHaveBeenCalledWith({
                    orderId: output.id,
                    amount: output.total
                });
                expect(mockInvoiceFacade.createInvoice).toHaveBeenCalledTimes(0)

            });

            it("should be approved", async () => {
                mockPaymentFacade.process = mockPaymentFacade.process.mockReturnValue({
                    transactionId: "1t",
                    orderId: "1o",
                    amount: 100,
                    status: "approved",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                });

                const input: PlaceOrderInputDto = {
                    clientId: "1c",
                    products: [{productId: "1"}, {productId: "2"}]
                }

                let output = await placeOrderUseCase.execute(input);

                expect(output.invoiceId).toBe("1i");
                expect(output.total).toBe(70);
                expect(output.products).toStrictEqual([
                    {productId: "1"},
                    {productId: "2"},
                ]);
                expect(mockClientFacade.find).toHaveBeenCalledTimes(1);
                expect(mockClientFacade.find).toHaveBeenCalledWith({id: "1c"});
                expect(mockValidateProducts).toHaveBeenCalledTimes(1);
                expect(mockValidateProducts).toHaveBeenCalledWith(input);
                expect(mockGetroducts).toHaveBeenCalledTimes(2);
                expect(mockCheckoutRepository.addOrder).toHaveBeenCalledTimes(1);
                expect(mockPaymentFacade.process).toHaveBeenCalledTimes(1);
                expect(mockPaymentFacade.process).toHaveBeenCalledWith({
                    orderId: output.id,
                    amount: output.total
                });
                expect(mockInvoiceFacade.createInvoice).toHaveBeenCalledTimes(1)
                expect(mockInvoiceFacade.createInvoice).toHaveBeenCalledWith({
                    name: clientProps.name,
                    document: clientProps.document,
                    street: clientProps.street,
                    number: clientProps.number,
                    complement: clientProps.complement,
                    city: clientProps.city,
                    state: clientProps.state,
                    zipCode: clientProps.zipCode,
                    items: [
                        {
                            id: products["1"].id.id,
                            name: products["1"].name,
                            price: products["1"].salesPrice
                        },
                        {
                            id: products["2"].id.id,
                            name: products["2"].name,
                            price: products["2"].salesPrice
                        },
                    ]
                })
            });
        });
    });
});