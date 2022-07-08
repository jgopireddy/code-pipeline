"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Budget = void 0;
const aws_budgets_1 = require("aws-cdk-lib/aws-budgets");
const constructs_1 = require("constructs");
class Budget extends constructs_1.Construct {
    constructor(scope, id, props) {
        super(scope, id);
        new aws_budgets_1.CfnBudget(this, 'Budget', {
            budget: {
                budgetLimit: {
                    amount: props.budgetAmount,
                    unit: 'USD'
                },
                budgetName: 'Monthly Budget',
                budgetType: 'COST',
                timeUnit: 'MONTHLY'
            },
            notificationsWithSubscribers: [{
                    notification: {
                        comparisonOperator: 'GREATER_THAN',
                        notificationType: 'ACTUAL',
                        threshold: 100,
                        thresholdType: 'PERCENTAGE'
                    },
                    subscribers: [{
                            address: props.emailAddress,
                            subscriptionType: 'EMAIL'
                        }
                    ]
                }]
        });
    }
}
exports.Budget = Budget;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVkZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYnVkZ2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHlEQUFvRDtBQUNwRCwyQ0FBdUM7QUFPdkMsTUFBYSxNQUFPLFNBQVEsc0JBQVM7SUFDakMsWUFBWSxLQUFlLEVBQUUsRUFBUyxFQUFFLEtBQWlCO1FBQ3JELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFakIsSUFBSSx1QkFBUyxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUU7WUFDMUIsTUFBTSxFQUFDO2dCQUNILFdBQVcsRUFBQztvQkFDUixNQUFNLEVBQUMsS0FBSyxDQUFDLFlBQVk7b0JBQ3pCLElBQUksRUFBQyxLQUFLO2lCQUNiO2dCQUNELFVBQVUsRUFBQyxnQkFBZ0I7Z0JBQzNCLFVBQVUsRUFBQyxNQUFNO2dCQUNqQixRQUFRLEVBQUMsU0FBUzthQUNyQjtZQUNELDRCQUE0QixFQUFDLENBQUM7b0JBQzFCLFlBQVksRUFBQzt3QkFDVCxrQkFBa0IsRUFBQyxjQUFjO3dCQUNqQyxnQkFBZ0IsRUFBQyxRQUFRO3dCQUN6QixTQUFTLEVBQUMsR0FBRzt3QkFDYixhQUFhLEVBQUMsWUFBWTtxQkFDN0I7b0JBQ0QsV0FBVyxFQUFDLENBQUM7NEJBQ1QsT0FBTyxFQUFDLEtBQUssQ0FBQyxZQUFZOzRCQUMxQixnQkFBZ0IsRUFBQyxPQUFPO3lCQUMzQjtxQkFDQTtpQkFDSixDQUFDO1NBQ0wsQ0FBQyxDQUFBO0lBQ04sQ0FBQztDQUNKO0FBN0JELHdCQTZCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENmbkJ1ZGdldCB9IGZyb20gJ2F3cy1jZGstbGliL2F3cy1idWRnZXRzJztcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xuXG5pbnRlcmZhY2UgQnVkZ2V0UHJvcHN7XG4gICAgYnVkZ2V0QW1vdW50OiBudW1iZXIsXG4gICAgZW1haWxBZGRyZXNzOiBzdHJpbmdcbn1cblxuZXhwb3J0IGNsYXNzIEJ1ZGdldCBleHRlbmRzIENvbnN0cnVjdHtcbiAgICBjb25zdHJ1Y3RvcihzY29wZTpDb25zdHJ1Y3QsIGlkOnN0cmluZywgcHJvcHM6QnVkZ2V0UHJvcHMpe1xuICAgICAgICBzdXBlcihzY29wZSwgaWQpO1xuXG4gICAgICAgIG5ldyBDZm5CdWRnZXQodGhpcywgJ0J1ZGdldCcsIHtcbiAgICAgICAgICAgIGJ1ZGdldDp7XG4gICAgICAgICAgICAgICAgYnVkZ2V0TGltaXQ6e1xuICAgICAgICAgICAgICAgICAgICBhbW91bnQ6cHJvcHMuYnVkZ2V0QW1vdW50LFxuICAgICAgICAgICAgICAgICAgICB1bml0OidVU0QnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBidWRnZXROYW1lOidNb250aGx5IEJ1ZGdldCcsXG4gICAgICAgICAgICAgICAgYnVkZ2V0VHlwZTonQ09TVCcsXG4gICAgICAgICAgICAgICAgdGltZVVuaXQ6J01PTlRITFknXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbm90aWZpY2F0aW9uc1dpdGhTdWJzY3JpYmVyczpbe1xuICAgICAgICAgICAgICAgIG5vdGlmaWNhdGlvbjp7XG4gICAgICAgICAgICAgICAgICAgIGNvbXBhcmlzb25PcGVyYXRvcjonR1JFQVRFUl9USEFOJyxcbiAgICAgICAgICAgICAgICAgICAgbm90aWZpY2F0aW9uVHlwZTonQUNUVUFMJyxcbiAgICAgICAgICAgICAgICAgICAgdGhyZXNob2xkOjEwMCxcbiAgICAgICAgICAgICAgICAgICAgdGhyZXNob2xkVHlwZTonUEVSQ0VOVEFHRSdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHN1YnNjcmliZXJzOlt7XG4gICAgICAgICAgICAgICAgICAgIGFkZHJlc3M6cHJvcHMuZW1haWxBZGRyZXNzLFxuICAgICAgICAgICAgICAgICAgICBzdWJzY3JpcHRpb25UeXBlOidFTUFJTCdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfV1cbiAgICAgICAgfSlcbiAgICB9XG59Il19