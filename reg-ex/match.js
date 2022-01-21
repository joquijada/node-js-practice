// String.match() is deficient, it only returns the first match. Would need to use the 'g' flag, BUT
// then capturing groups are not returned. Moreover, presence of global flag 'g' determines that the ouput
// Array looks like, [REF|https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match|"An Array whose contents depend on the presence or absence of the global (g) flag, or null if no matches are found"]
// In other words having 'g' flag gives an Array with the scalarly matches, and not having it gives an object, but only
// on the first match (subsequent matches are ignored)
var str2 = "ApiEndpoint: https://bgu1kvfafe.execute-api.us-east-1.amazonaws.com\nHandleCerebrumImageFulfillmentRoleArn: arn:aws:iam::433661183964:role/dev-charcot-charcot-stack-HandleCerebrumImageFulfi-FC4S69T27R79\nHandleCerebrumImageTransferRoleArn: arn:aws:iam::433661183964:role/dev-charcot-charcot-stack-HandleCerebrumImageTrans-ZPQU1IO615QA"
var res = str2.match(/(?<roleType>HandleCerebrumImageFulfillmentRoleArn|HandleCerebrumImageTransferRoleArn)/g)
/*
 * Below line gives:
 * [
 *   'HandleCerebrumImageFulfillmentRoleArn',
 *   'HandleCerebrumImageTransferRoleArn'
 * ]
 */
console.log(res)
console.log(res.groups) // undefined

// Below line gives an object as per [REF|https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match|"In this case, the returned item will have additional properties as described below"]
res = str2.match(/(?<roleType>HandleCerebrumImageFulfillmentRoleArn|HandleCerebrumImageTransferRoleArn)/)
console.log(res)
