const Queue = require("./Queue");

class StarshipEnterprise {
  constructor(officerId = null, officerName = null, reportTo = null) {
    this.officerId = officerId;
    this.officerName = officerName;
    this.reportTo = reportTo; // the officer that the new officer reports to
    this.leftReport = null;
    this.rightReport = null;
  }

  assignOfficer(officerId, officerName) {
    // your solution here

    if (!this.officerId) {
      this.officerId = officerId;
      this.officerName = officerName;
      this.reportTo = null;
      this.leftReport = null;
      this.rightReport = null;
      // Make sure to end the function if this case has been called
      return;
    }

    if (this.officerId > officerId) {
      if (!this.leftReport) {
        this.leftReport = new StarshipEnterprise(officerId, officerName, this);
      } else {
        return this.leftReport.assignOfficer(officerId, officerName);
      }
    } else {
      if (!this.rightReport) {
        this.rightReport = new StarshipEnterprise(officerId, officerName, this);
      } else {
        return this.rightReport.assignOfficer(officerId, officerName);
      }
    }
  }

  findOfficersWithNoDirectReports(values = []) {
    // your solution here

    // Base case
    if (!this.leftReport && !this.rightReport) {
      values.push(this.officerName);
    }

    if (this.leftReport) this.leftReport.findOfficersWithNoDirectReports(values);
    if (this.rightReport) this.rightReport.findOfficersWithNoDirectReports(values);

    return values;
  }

  listOfficersByExperience(officerNames = []) {
    // your solution here

    let right = [];
    let left = [];

    if (this.rightReport) {
      right = this.rightReport.listOfficersByExperience();
    }


    if (this.leftReport) {
      left = this.leftReport.listOfficersByExperience();
    }

    return [...right, this.officerName, ...left];
  }

  listOfficersByRank(tree, rankedOfficers = {}) {
    // your solution here

    const officers = new Queue();
    let rank = 1;

    officers.enqueue([tree, rank]);

    let officer = officers.dequeue();

    while (officer) {
      const node = officer[0];
      const name = node.officerName;
      const rank = officer[1];

      if (!rankedOfficers[rank]) {
        rankedOfficers[rank] = [name];
      } else {
        rankedOfficers[rank].push(name);
      }

      if (node.leftReport) officers.enqueue([node.leftReport, rank + 1]);
      if (node.rightReport) officers.enqueue([node.rightReport, rank +1]);
      
      officer = officers.dequeue();
    }

    return rankedOfficers;
  }

  findOfficer(officerId) {
    if (this.officerId == officerId) return this;

    if (this.leftReport) {
      const found = this.leftReport.findOfficer(officerId);
      if (found) return found;
    }
    if (this.rightReport) {
      const found = this.rightReport.findOfficer(officerId);
      if (found) return found;
    }
     
    return null;
  }
}

module.exports = StarshipEnterprise;
