import { Template } from 'aws-cdk-lib/assertions';
import { App, Stack } from 'aws-cdk-lib';
import { Budget } from '../../lib/constructs/budget';


test('Budget Construct', ()=>{
    const app = new App();
    const stack = new Stack(app, 'Stack');

    new Budget(stack, "Budget", {
        budgetAmount:1,
        emailAddress:'test@gmail.com'
    })

    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::Budgets::Budget',{
        Budget:{
            BudgetLimit:{
                Amount:1
            }
        },
        NotificationsWithSubscribers: [
            {
                Subscribers:[
                    {
                        Address:'test@gmail.com'
                    }
                ]
            }
        ]
    });

});