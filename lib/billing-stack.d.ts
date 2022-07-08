import { Construct } from 'constructs';
import { Stack, StackProps } from 'aws-cdk-lib';
interface BiilingStackProps extends StackProps {
    budgetAmount: number;
    emailAddress: string;
}
export declare class BillingStack extends Stack {
    constructor(scope: Construct, id: string, props: BiilingStackProps);
}
export {};
