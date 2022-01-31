// Overcomes deficiency of String.match() in that capturing groups are returned with 'g' flag.
const str = target()//.replace(/\n/g, '__NEWLINE__')
//console.log(str)
const res = str.matchAll(/\s{4}(\S+): (.+)/g)
//console.log(`JMQ: ${res}`)

const out = []
for (const m of res) {
  console.log(`JMQ: ${m[2]}`)
  // out.push({ resource: m.groups.resource, arn: m.groups.arn })
}

console.log(JSON.stringify((out)))

// Below line gives an object as per
// [REF|https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/matchAll|"The RegExp object must have the /g flag, otherwise a TypeError will be thrown."]
//res = str.matchAll(/(?<roleType>HandleCerebrumImageFulfillmentRoleArn|HandleCerebrumImageTransferRoleArn)/g)
//console.log(res)

function target() {
  return "Using stage: dev\n" +
    "Preparing your SST app\n" +
    "Detected tsconfig.json\n" +
    "Transpiling source\n" +
    "Linting source\n" +
    "Running type checker\n" +
    "Building Lambda function src/lambda/cerebrum-image-transfer.handle\n" +
    "Building Lambda function src/lambda/cerebrum-image-fulfillment.handle\n" +
    "Building Lambda function src/lambda/cerebrum-image-metadata.create\n" +
    "Building Lambda function src/lambda/cerebrum-image-search.handle\n" +
    "Building Lambda function src/lambda/cerebrum-image-order.create\n" +
    "Linting Lambda function source\n" +
    "\n" +
    "/Users/jmquij0106/git/charcot/src/lambda/cerebrum-image-fulfillment.ts\n" +
    "  36:74  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any\n" +
    "  40:81  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any\n" +
    "  65:24  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any\n" +
    "\n" +
    "/Users/jmquij0106/git/charcot/src/lambda/cerebrum-image-order.ts\n" +
    "  33:48  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any\n" +
    "\n" +
    "/Users/jmquij0106/git/charcot/src/lambda/cerebrum-image-search.ts\n" +
    "  58:40  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any\n" +
    "  59:41  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any\n" +
    "\n" +
    "/Users/jmquij0106/git/charcot/src/lambda/cerebrum-image-transfer.ts\n" +
    "  5:35  warning  Unexpected any. Specify a different type  @typescript-eslint/no-explicit-any\n" +
    "\n" +
    "✖ 7 problems (0 errors, 7 warnings)\n" +
    "\n" +
    "Type checking Lambda function source\n" +
    "Deploying dev-charcot-charcot-stack\n" +
    "\n" +
    " ✅  dev-charcot-charcot-stack (no changes)\n" +
    "\n" +
    "\n" +
    "Stack dev-charcot-charcot-stack\n" +
    "  Status: no changes\n" +
    "  Outputs:\n" +
    "    ApiEndpoint: https://bgu1kvfafe.execute-api.us-east-1.amazonaws.com\n" +
    "    handleCerebrumImageFulfillmentRoleArn: arn:aws:iam::433661183964:role/dev-charcot-charcot-stack-HandleCerebrumImageFulfi-FC4S69T27R79\n" +
    "    handleCerebrumImageTransferRoleArn: arn:aws:iam::433661183964:role/dev-charcot-charcot-stack-HandleCerebrumImageTrans-ZPQU1IO615QA\n"
}
