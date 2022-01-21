// Overcomes deficiency of String.match() in that capturing groups are returned with 'g' flag.
var str = "ApiEndpoint: https://bgu1kvfafe.execute-api.us-east-1.amazonaws.com\nHandleCerebrumImageFulfillmentRoleArn: arn:aws:iam::433661183964:role/dev-charcot-charcot-stack-HandleCerebrumImageFulfi-FC4S69T27R79\nHandleCerebrumImageTransferRoleArn: arn:aws:iam::433661183964:role/dev-charcot-charcot-stack-HandleCerebrumImageTrans-ZPQU1IO615QA"
var res = str.matchAll(/(?<roleType>HandleCerebrumImageFulfillmentRoleArn|HandleCerebrumImageTransferRoleArn)/g)

console.log([...res])

// Below line gives an object as per
// [REF|https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/matchAll|"The RegExp object must have the /g flag, otherwise a TypeError will be thrown."]
res = str.matchAll(/(?<roleType>HandleCerebrumImageFulfillmentRoleArn|HandleCerebrumImageTransferRoleArn)/)
console.log(res)
