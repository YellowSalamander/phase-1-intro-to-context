// Your code here
function createEmployeeRecord(array) {
    const employeeRecord = {
      firstName: array[0],   
      familyName: array[1],  
      title: array[2],  
      payPerHour: array[3],
      timeInEvents: [],
      timeOutEvents: [],      
    };
  
    return employeeRecord;
  }

  function createEmployeeRecords(arrayOfArrays) {
const employeeRecords = [];

for (const array of arrayOfArrays) {
    const employeeRecord = createEmployeeRecord(array);
    employeeRecords.push(employeeRecord);
  }

  return employeeRecords;
}
function createTimeInEvent(employeeRecord, dateStamp) {

    const [date, time] = dateStamp.split(' ');
  

    const hour = parseInt(time, 10);
  

    const timeInEvent = {
      type: "TimeIn",
      date: date,
      hour: hour,
    };
  

    employeeRecord.timeInEvents.push(timeInEvent);
  
    return employeeRecord;
  }
  function createTimeOutEvent(employeeRecord, dateStamp) {
    const [date, time] = dateStamp.split(' ');
    const hour = parseInt(time, 10);
  
    const timeOutEvent = {
      type: "TimeOut",
      date: date,
      hour: hour,
    };
  
    employeeRecord.timeOutEvents.push(timeOutEvent);
  
    return employeeRecord;
  }
  function hoursWorkedOnDate(employeeRecord, date) {
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);
  
    if (timeInEvent && timeOutEvent) {
      return (timeOutEvent.hour - timeInEvent.hour) / 100;
    }
  
    return 0;
  }
  
  function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    const payRate = employeeRecord.payPerHour;
  
    return hoursWorked * payRate;
  }

  function allWagesFor(employeeRecord) {
    const dates = employeeRecord.timeInEvents.map(event => event.date);
    let totalWages = 0;
  
    for (const date of dates) {
      totalWages += wagesEarnedOnDate(employeeRecord, date);
    }
  
    return totalWages;
  }
  
  function calculatePayroll(employeeRecords) {
    let totalPayroll = 0;
  
    for (const employeeRecord of employeeRecords) {
      totalPayroll += allWagesFor(employeeRecord);
    }
  
    return totalPayroll;
  }