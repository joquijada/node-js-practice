const { promisify } = require('util')
const { exec } = require('child_process')
const execP = promisify(exec)
console.log(`Process info ${JSON.stringify(process.env)}`)

// Captured groups are ignored when the global flag ('g') is used when using String.match(),
// [REF|https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/matchAll|'Capture groups are ignored when using match() with the global /g flag']

// Below two ways of defining a pattern are equivalent
//var pattern = /(\S+):(\S+)/g
var pattern = RegExp('\\S+', 'g')

const str = 'a:1 b:2 c:3'
console.log(str.match(pattern)) // [ 'a:1', 'b:2', 'c:3' ]

// Need to omit global flag to get captured groups, also captured groups must be named,
// [REF|https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match|"An object of named capturing groups whose keys are the names and values"]
console.log(JSON.stringify(str.match(/(?<key>\S+):(?<value>\S+)/).groups))

// Using RegExp.exec() is a different beast altogether. Must use global flag to get captured groups, moreover
// Must iterate over each invocation of exec(). The use of global flag activates behavior which "remembers" where last match
// occurred to know where it left off in order to pick up next match in each iteration
while (r = pattern.exec(str)) {
  console.log(`Using RegExp.exec() match: ${r}`)
}

// String.matchAll() simplifies the affair of iterating over captured groups
var matches = str.matchAll(pattern)
console.log(`Using 'String.matchAll(), there were ${[...matches].length} matches.`)
matches = str.matchAll(pattern)
for (var m of matches) {
  console.log(`Using 'String.matchAll(), entire match is ${m[0]} matched group 1 is ${m[1]}, matched group 2 is ${m[2]}`)
}


//const memStats = top.match(/PhysMem: (?<totalUsed>\d+\w).*(?<totalFree>\d+\w) unused.*MEM.*(?<processUsed>\d+\w)/m)
//const memStats = (/.+PhysMem: (?<totalUsed>\d+\w).*(?<totalFree>\d+\w) unused.*MEM.*(?<processUsed>\d+\w)/gm).exec(top)
//console.log(top.replaceAll('\n', ' '))

resourceUsageReport().then(console.log, console.error)

async function resourceUsageReport() {
  //const { stdout: memStats } = await execP(`top -pid 25217 -l 1 -stats mem`)
  const memStats = memInfo()
  console.log(memStats)
  //const extractedStats = memStats.replace(/\n/g, ' ').matchAll(/.*PhysMem: (\d+\w).*?(\d+\w)\sunused.*MEM.*?(\d+\w).*/)
  //const extractedStats = memStats.replace(/\n/g, ' ').match(/PhysMem: (?<totalUsedMemory>\d+\w).*?(?<totalFreeMemory>\d+\w)\sunused.*MEM.*?(?<processUsedMemory>\d+\w)/)
  const extractedStats = memStats.replace(/\n/g, ' ').match(/PhysMem: (?<totalUsedMemory>\d+\w).*?(?<totalFreeMemory>\d+\w)\sunused.*MEM.*?(?<processUsedMemory>\d+\w)/)
  //const memStats = top.replace(/\n/g, ' ').matchAll(/.*PhysMem: (\d+\w).*?(\d+\w)\sunused.*MEM.*?(\d+\w).*/)
  console.log(extractedStats.groups)
  /*for (var m of extractedStats) {
    console.log(`Using 'String.matchAll(), entire match is ${m[0]} matched group 1 is ${m[1]}, matched group 2 is ${m[2]}, matched group 3 is ${m[3]}`)
  }*/
  return 'Fuck you'
}

function memInfo() {
  return '# cat /proc/meminfo \n' +
  'MemTotal:        1882064 kB\n' +
  'MemFree:         1376380 kB\n' +
  'MemAvailable:    1535676 kB\n' +
  'Buffers:            2088 kB\n' +
  'Cached:           292324 kB\n' +
  'SwapCached:            0 kB\n' +
  'Active:           152944 kB\n' +
  'Inactive:         252628 kB\n' +
  'Active(anon):     111328 kB\n' +
  'Inactive(anon):    16508 kB\n' +
  'Active(file):      41616 kB\n' +
  'Inactive(file):   236120 kB\n' +
  'Unevictable:           0 kB\n' +
  'Mlocked:               0 kB\n' +
  'SwapTotal:       2097148 kB\n' +
  'SwapFree:        2097148 kB\n' +
  'Dirty:                40 kB\n' +
  'Writeback:             0 kB\n' +
  'AnonPages:        111180 kB\n' +
  'Mapped:            56396 kB\n' +
  'Shmem:             16676 kB'
}

