const tables = {
  Invitee: [
    { invitee_no: 1, invitee_name: "Aqwd", invited_by: "Bwer" },
    { invitee_no: 2, invitee_name: "Bwer", invited_by: "Cwer" },
    { invitee_no: 3, invitee_name: "Cwr", invited_by: "Der" },
    { invitee_no: 4, invitee_name: "Cer", invited_by: "wer" },
    { invitee_no: 5, invitee_name: "wer", invited_by: "Dwe" },
  ],
  Room: [
    { room_no: 100, room_name: "100A", floor_number: 1 },
    { room_no: 201, room_name: "201B", floor_number: 2 },
    { room_no: 302, room_name: "302C", floor_number: 3 },
    { room_no: 402, room_name: "402D", floor_number: 4 },
    { room_no: 502, room_name: "502E", floor_number: 5 },
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
      ending_time: "2226-04-03 10:00:00",
      room_no: 3,
    },
    {
      meeting_title: "Job",
      starting_time: "2320-05-01 09:00:00",
      ending_time: "2324-06-01 10:00:00",
      room_no: 4,
    },
    {
      meeting_title: "Job",
      starting_time: "2320-05-01 09:00:00",
      ending_time: "2321-06-01 10:00:00",
      room_no: 5,
    },
  ],
};

module.exports = tables;
