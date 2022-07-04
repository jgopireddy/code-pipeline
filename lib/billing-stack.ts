import { Construct } from 'constructs';
import { Stack, StackProps } from 'aws-cdk-lib';
import { Budget } from './constructs/budget';

interface BiilingStackProps extends StackProps{

    budgetAmount : number,
    emailAddress : string
}

export class BillingStack extends Stack{

    constructor(scope : Construct, id : string, props : BiilingStackProps){
        super(scope, id, props);

        new Budget(this, 'Budget', {
            budgetAmount: props.budgetAmount,
            emailAddress: props.emailAddress
        });
    }
}