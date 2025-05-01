// Write a function `rooms` that determines the minimum number of
// rooms required to handle a series of interviews given their
// time intervals.

// Each interval is represented as an array [start, end],
// where `start` is the start time and `end` is the end
// time of the interview.

// The function should return the number of conference rooms
// required to ensure no two interviews overlap in the same room.

// Example I:
// Input: intervals = [[20, 25], [10, 15], [0, 25]]
// Output: 2
// Explanation: The first interview is scheduled from
//              time 0 to 25. The second interview is
//              from time 10 to 15 and overlaps with
//              the first interview, requiring a second
//              room. The third interview from 20 to 25
//              also overlaps with the first. Thus, a
//              minimum of two rooms are required.

// Example II:
// Input: intervals = [[5, 9], [1, 3]]
// Output: 1
// Explanation: The first interview is scheduled from
//              time 5 to 9. The second interview is
//              from time 1 to 3. These two interviews
//              do not overlap, therefore only one
//              conference room is needed.

/*
input: 2D array each subarray has 2 sorted ints, a start and end time
output: int
rules:
- each subarray is a start time and end time (e.g. [10, 40] limning an event
that starts at 10 and ends at 40)
- two subarrays cover the same time frame when they "overlap" when treated as
ranges (e.g. [10, 40] and [1, 15] which overlap from 10 - 15)
- two subarrays where the start of one is the end of another do not overlap --
e.g. [0,4] [4,8] dont overlap
  -- to capture this idea we'll treat each range as *including* its first elem
  but as NOT including its second elem
- the return value should be the number of subarrays that overlap at the minute
of maximum overlap
- we can treat each subarray as a range. and we are trying to find
the integer of max overlap and then return the number of subarrays that overlap
at that minute
- the input array is NOT SORTED

algorithm:
[1, 5], [2, 3], [4, 6], [5, 7]

1 2 3 4 5
  2 3
      4 5 6
        5 6 7
S           E

if overlapping at S === 1, S++
if overlapping at E === 1, E--
if (overlap(S) < overlap(E)) S++
else E--

if (overlap(S) === 1 || overlap(S) < overlap(E)) S++
else E--

[20, 25], [10, 15], [0, 25]
                  20...25
        10...15
0...5...10...15...20...25

i could sort by start time?
0...5...10...15...20...25
        10...15
                  20...25
^                      ^
S                      E

let totalRooms start at 1;

what if we use a start / end pointer strat between the minimum start time
and max end time -- sliding along the ints between those two vals?

let start = minStart
let end = maxEnd
while (start < end) {
  count the number of subarrays that "include" the number at start
  count the number of subarrays that "include" the number at end
  if either is === 1, increment/decrement
  if start includes fewer, increment. else decrement end
}


return overlaps at start

HELPERFUNCTION
countOverlaps(ranges, num)
input: 2d array, each subarray treated like a range
output: int

ranges.reduce(count, range) if num inside range count++, return count

return result of reduce
*/

// Test Cases:

function rooms(times) {
  let firstMinute = Math.min(...times.map(([start, _]) => start));
  let lastMinute = Math.max(...times.map(([_, end]) => end));
  let allMinutes = new Array(lastMinute - firstMinute + 1)
    .fill()
    .map((_, idx) => idx + firstMinute);
  return Math.max(...allMinutes.map(min => meetingsThisMinute(times, min)));
}

function meetingsThisMinute(meetingTimes, minute) {
  return meetingTimes.reduce((meetings, time) => {
    return (time[0] <= minute && time[1] > minute) ? meetings + 1 : meetings;
  }, 0);
}

console.log(rooms([[20, 25], [10, 15], [0, 25]]) === 2);
console.log(rooms([[5, 9], [1, 3]]) === 1);
console.log(rooms([[1, 2], [3, 4], [5, 6]]) === 1);
console.log(rooms([[1, 4], [2, 5], [3, 6]]) === 3);
console.log(rooms([[1, 3], [3, 6], [6, 8]]) === 1);
console.log(rooms([[1, 10]]) === 1);
console.log(rooms([[1, 3], [2, 4], [4, 6]]) === 2);
console.log(rooms([[1, 5], [2, 3], [4, 6], [5, 7]]) === 2);
console.log(rooms([[0, 5], [1, 3], [2, 6], [4, 7], [5, 9], [8, 10]]) === 3);
console.log(rooms([[1, 2], [2, 3], [3, 4], [4, 5]]) === 1);
console.log(rooms([[1, 20], [5, 10], [11, 15], [16, 18]]) === 2);
console.log(rooms([[1, 4], [1, 3], [1, 2], [1, 5]]) === 4);
console.log(rooms([[0, 10], [0, 1], [1, 5], [5, 10], [1, 9]]) === 3);
// All test cases should log true