class Payment {
    constructor(roomid, status, resortName, name, email, phone, totalCharges, advance) {
      this.roomid = roomid;
      this.status = status;
      this.resortName = resortName;
      this.name = name;
      this.email = email;
      this.phone = phone;
      this.totalCharges = totalCharges;
      this.advance = advance;
    }
  }
  
  module.exports = Payment;
  