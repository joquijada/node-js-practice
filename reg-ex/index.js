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

// Need to omit global flag to get captured groups, also captured groups must be named if one wants the 'groups' structure available
// [REF|https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match|"An object of named capturing groups whose keys are the names and values"]
console.log(JSON.stringify(str.match(/(?<key>\S+):(?<value>\S+)/).groups))

// Using RegExp.exec() is a different beast altogether. Must use global flag to get captured groups, moreover
// must iterate over each invocation of exec(). The use of global flag activates behavior which "remembers" where last match
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
  //const { stdout: memStats } = await execP(`top -pid 25217 -l 1 -stats mem`) // Works on MacOS
  for (const func of [memInfoLinux, memInfoMacOs]) {
    const memStats = func()
    console.log(`memStats is ${memStats}`)
    //const extractedStats = memStats.replace(/\n/g, ' ').matchAll(/(\S+):\s+(\d+\s*\w*)/g)
    const extractedStats = memStats.replace(/\n/g, '__NEWLINE__').matchAll(/(.+?):\s+(.+?)__NEWLINE__/g)
    for (var m of extractedStats) {
      console.log(`Using 'String.matchAll(), entire match is '${m[0]}', matched group 1 is '${m[1]}', matched group 2 is '${m[2]}'`)
    }
  }

  //const extractedStats = memStats.replace(/\n/g, ' ').matchAll(/.*PhysMem: (\d+\w).*?(\d+\w)\sunused.*MEM.*?(\d+\w).*/)
  //const extractedStats = memStats.replace(/\n/g, ' ').match(/PhysMem: (?<totalUsedMemory>\d+\w).*?(?<totalFreeMemory>\d+\w)\sunused.*MEM.*?(?<processUsedMemory>\d+\w)/)
  //const memStats = top.replace(/\n/g, ' ').matchAll(/.*PhysMem: (\d+\w).*?(\d+\w)\sunused.*MEM.*?(\d+\w).*/)

  console.log(`Number of FD's in Linux is ${[...fdInfoLinux().replace(/\n/g, ' ').matchAll(/\d+ ->/g)].length}`)
  console.log(`Number of FD's in MacOs is ${[...fdInfoMacOs().matchAll(/\n/g)].length}`)
  return 'Fuck you'
}

function memInfoLinux() {
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

function memInfoMacOs() {
  return 'Processes: 506 total, 3 running, 503 sleeping, 3390 threads \n' +
    '2021/03/20 20:04:26\n' +
    'Load Avg: 2.05, 3.25, 3.54 \n' +
    'CPU usage: 5.29% user, 21.76% sys, 72.94% idle \n' +
    'SharedLibs: 256M resident, 54M data, 14M linkedit.\n' +
    'MemRegions: 318564 total, 4485M resident, 100M private, 3523M shared.\n' +
    'PhysMem: 16G used (4588M wired), 246M unused.\n' +
    'VM: 4563G vsize, 1993M framework vsize, 431772604(0) swapins, 435824642(0) swapouts.\n' +
    'Networks: packets: 61697373/97G in, 61522683/96G out.\n' +
    'Disks: 58857621/2042G read, 19420059/1818G written.\n'
}

function fdInfoLinux() {
  return 'total 0\n' +
  'lr-x------ 1 sbx_user1051 990 64 Mar 12 03:46 0 -> /dev/null\n' +
  'l-wx------ 1 sbx_user1051 990 64 Mar 12 03:46 1 -> pipe:[5144]\n' +
  'lrwx------ 1 sbx_user1051 990 64 Mar 12 03:46 10 -> anon_inode:[eventpoll]\n' +
  'lr-x------ 1 sbx_user1051 990 64 Mar 12 03:46 11 -> pipe:[4413]\n' +
  'l-wx------ 1 sbx_user1051 990 64 Mar 12 03:46 12 -> pipe:[4413]\n' +
  'lrwx------ 1 sbx_user1051 990 64 Mar 12 03:46 13 -> anon_inode:[eventfd]\n' +
  'lrwx------ 1 sbx_user1051 990 64 Mar 12 03:46 14 -> anon_inode:[eventpoll]\n' +
  'lr-x------ 1 sbx_user1051 990 64 Mar 12 03:46 15 -> pipe:[5153]\n' +
  'l-wx------ 1 sbx_user1051 990 64 Mar 12 03:46 16 -> pipe:[5153]\n' +
  'lrwx------ 1 sbx_user1051 990 64 Mar 12 03:46 17 -> anon_inode:[eventfd]\n' +
  'lr-x------ 1 sbx_user1051 990 64 Mar 12 03:46 18 -> /dev/null\n' +
  'lrwx------ 1 sbx_user1051 990 64 Mar 12 03:46 19 -> socket:[5162]\n' +
  'l-wx------ 1 sbx_user1051 990 64 Mar 12 03:46 2 -> pipe:[5144]\n' +
  'lrwx------ 1 sbx_user1051 990 64 Mar 12 03:46 20 -> socket:[4416]\n' +
  'lrwx------ 1 sbx_user1051 990 64 Mar 12 03:46 21 -> socket:[6172]\n' +
  'lrwx------ 1 sbx_user1051 990 64 Mar 12 03:46 22 -> socket:[5069]\n' +
  'lrwx------ 1 sbx_user1051 990 64 Mar 12 03:46 23 -> socket:[6180]\n' +
  'lrwx------ 1 sbx_user1051 990 64 Mar 12 03:46 24 -> socket:[4925]\n' +
  'lrwx------ 1 sbx_user1051 990 64 Mar 12 03:46 25 -> socket:[6174]\n' +
  'lrwx------ 1 sbx_user1051 990 64 Mar 12 03:46 26 -> socket:[5784]\n' +
  'lrwx------ 1 sbx_user1051 990 64 Mar 12 03:46 27 -> socket:[4743]\n' +
  'lrwx------ 1 sbx_user1051 990 64 Mar 12 03:46 28 -> socket:[5070]\n' +
  'lrwx------ 1 sbx_user1051 990 64 Mar 12 03:46 29 -> socket:[6176]\n' +
  'l-wx------ 1 sbx_user1051 990 64 Mar 12 03:46 3 -> pipe:[4318]\n'
}

function fdInfoMacOs() {
  return 'node       3850 jmquij0106   28u  IPv4 0x76e39467498810d9      0t0  TCP 127.0.0.1:49593 (LISTEN)\n' +
    'node       3850 jmquij0106   29u  IPv4 0x76e394674db47959      0t0  TCP 127.0.0.1:49594 (LISTEN)\n' +
    'node       3850 jmquij0106   31u  IPv4 0x76e394674c69f339      0t0  TCP 127.0.0.1:45623 (LISTEN)\n' +
    'node       3850 jmquij0106   32u  IPv4 0x76e39467505e0339      0t0  TCP 127.0.0.1:54671 (LISTEN)\n'
}

