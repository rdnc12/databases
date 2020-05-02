const tables = {
  Invitee: [
    { invitee_no: 1, invitee_name: "Aqwd", invited_by: "Bwer" },
    { invitee_no: 2, invitee_name: "Bwer", invited_by: "Cwer" },
    { invitee_no: 3, invitee_name: "Cwer", invited_by: "Dwer" },
  ],
  Room: [
    { room_no: 100, room_name: "100A", floor_number: 1 },
    { room_no: 201, room_name: "201B", floor_number: 2 },
    { room_no: 302, room_name: "302C", floor_number: 3 },
  ],
  Meeting: [
    {
      meeting_title: "Job",
      starting_time: "2320-05-01 09:00:00",
      ending_time: "2320-06-01 10:00:00",
      room_no: 1,
    },
    {
      meeting_title: "Bread",
      starting_time: "2180-06-02 09:00:00",
      ending_time: "2180-06-02 10:00:00",
      room_no: 2,
    },
    {
      meeting_title: "Computer",
      starting_time: "2222-04-03 09:00:00",
      ending_time: "2222-04-03 10:00:00",
      room_no: 3,
    },
  ],
};

module.exports = tables;
