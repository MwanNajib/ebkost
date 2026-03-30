declare module "midtrans-client" {
  export class Snap {
    constructor(options: {
      isProduction: boolean;
      serverKey: string;
      clientKey: string;
    });
    createTransaction(parameter: any): Promise<any>;
    transaction: {
      status(orderId: string): Promise<any>;
      approve(orderId: string): Promise<any>;
      cancel(orderId: string): Promise<any>;
      expire(orderId: string): Promise<any>;
    }
  }
  
  export class CoreApi {
    constructor(options: {
      isProduction: boolean;
      serverKey: string;
      clientKey: string;
    });
    charge(parameter: any): Promise<any>;
    transaction: {
      status(transactionId: string): Promise<any>;
      approve(transactionId: string): Promise<any>;
      cancel(transactionId: string): Promise<any>;
      expire(transactionId: string): Promise<any>;
    }
  }
}
