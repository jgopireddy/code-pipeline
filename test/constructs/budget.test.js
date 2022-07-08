"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assertions_1 = require("aws-cdk-lib/assertions");
const aws_cdk_lib_1 = require("aws-cdk-lib");
const budget_1 = require("../../lib/constructs/budget");
test('Budget Construct', () => {
    const app = new aws_cdk_lib_1.App();
    const stack = new aws_cdk_lib_1.Stack(app, 'Stack');
    new budget_1.Budget(stack, "Budget", {
        budgetAmount: 1,
        emailAddress: 'test@gmail.com'
    });
    const template = assertions_1.Template.fromStack(stack);
    template.hasResourceProperties('AWS::Budgets::Budget', {
        Budget: {
            BudgetLimit: {
                Amount: 1
            }
        },
        NotificationsWithSubscribers: [
            {
                Subscribers: [
                    {
                        Address: 'test@gmail.com'
                    }
                ]
            }
        ]
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVkZ2V0LnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJidWRnZXQudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVEQUFrRDtBQUNsRCw2Q0FBeUM7QUFDekMsd0RBQXFEO0FBR3JELElBQUksQ0FBQyxrQkFBa0IsRUFBRSxHQUFFLEVBQUU7SUFDekIsTUFBTSxHQUFHLEdBQUcsSUFBSSxpQkFBRyxFQUFFLENBQUM7SUFDdEIsTUFBTSxLQUFLLEdBQUcsSUFBSSxtQkFBSyxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUV0QyxJQUFJLGVBQU0sQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFO1FBQ3hCLFlBQVksRUFBQyxDQUFDO1FBQ2QsWUFBWSxFQUFDLGdCQUFnQjtLQUNoQyxDQUFDLENBQUE7SUFFRixNQUFNLFFBQVEsR0FBRyxxQkFBUSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUUzQyxRQUFRLENBQUMscUJBQXFCLENBQUMsc0JBQXNCLEVBQUM7UUFDbEQsTUFBTSxFQUFDO1lBQ0gsV0FBVyxFQUFDO2dCQUNSLE1BQU0sRUFBQyxDQUFDO2FBQ1g7U0FDSjtRQUNELDRCQUE0QixFQUFFO1lBQzFCO2dCQUNJLFdBQVcsRUFBQztvQkFDUjt3QkFDSSxPQUFPLEVBQUMsZ0JBQWdCO3FCQUMzQjtpQkFDSjthQUNKO1NBQ0o7S0FDSixDQUFDLENBQUM7QUFFUCxDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFRlbXBsYXRlIH0gZnJvbSAnYXdzLWNkay1saWIvYXNzZXJ0aW9ucyc7XG5pbXBvcnQgeyBBcHAsIFN0YWNrIH0gZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgQnVkZ2V0IH0gZnJvbSAnLi4vLi4vbGliL2NvbnN0cnVjdHMvYnVkZ2V0JztcblxuXG50ZXN0KCdCdWRnZXQgQ29uc3RydWN0JywgKCk9PntcbiAgICBjb25zdCBhcHAgPSBuZXcgQXBwKCk7XG4gICAgY29uc3Qgc3RhY2sgPSBuZXcgU3RhY2soYXBwLCAnU3RhY2snKTtcblxuICAgIG5ldyBCdWRnZXQoc3RhY2ssIFwiQnVkZ2V0XCIsIHtcbiAgICAgICAgYnVkZ2V0QW1vdW50OjEsXG4gICAgICAgIGVtYWlsQWRkcmVzczondGVzdEBnbWFpbC5jb20nXG4gICAgfSlcblxuICAgIGNvbnN0IHRlbXBsYXRlID0gVGVtcGxhdGUuZnJvbVN0YWNrKHN0YWNrKTtcblxuICAgIHRlbXBsYXRlLmhhc1Jlc291cmNlUHJvcGVydGllcygnQVdTOjpCdWRnZXRzOjpCdWRnZXQnLHtcbiAgICAgICAgQnVkZ2V0OntcbiAgICAgICAgICAgIEJ1ZGdldExpbWl0OntcbiAgICAgICAgICAgICAgICBBbW91bnQ6MVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBOb3RpZmljYXRpb25zV2l0aFN1YnNjcmliZXJzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgU3Vic2NyaWJlcnM6W1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBBZGRyZXNzOid0ZXN0QGdtYWlsLmNvbSdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH0pO1xuXG59KTsiXX0=