function createEmployee(data) {
    return {
      firstName: data[0],
      lastName: data[1],
      jobTitle: data[2],
      hourlyRate: data[3],
      clockIns: [],
      clockOuts: []
    };
  }

  function createEmployees(employeeData) {
    return employeeData.map(createEmployee);
  }

  function clockIn(dateTime) {
    const [date, hour] = dateTime.split(' ');
    this.clockIns.push({ type: 'ClockIn', date, hour: parseInt(hour, 10) });
    return this;
  }

  function clockOut(dateTime) {
    const [date, hour] = dateTime.split(' ');
    this.clockOuts.push({ type: 'ClockOut', date, hour: parseInt(hour, 10) });
    return this;
  }

  function calculateHoursWorkedOnDate(date) {
    const clockInEvent = this.clockIns.find(event => event.date === date);
    const clockOutEvent = this.clockOuts.find(event => event.date === date);
    if (clockInEvent && clockOutEvent) {
      return (clockOutEvent.hour - clockInEvent.hour) / 100;
    }
    return 0;
  }

  function calculateEarningsOnDate(date) {
    const hoursWorked = calculateHoursWorkedOnDate.call(this, date);
    return hoursWorked * this.hourlyRate;
  }

  const calculateTotalEarnings = function () {
    const workDates = this.clockIns.map(function (event) {
      return event.date;
    });

    const totalEarnings = workDates.reduce(function (total, date) {
      return total + calculateEarningsOnDate.call(this, date);
    }.bind(this), 0);

    return totalEarnings;
  };

  function calculatePayroll(employees) {
    return employees.reduce((totalPayroll, employee) => totalPayroll + calculateTotalEarnings.call(employee), 0);
  }

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but