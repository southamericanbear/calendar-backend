const { response } = require("express");
const Event = require("../models/Event");

const getEvents = async (req, res = response) => {
  const events = await Event.find().populate("user", "name");

  return res.status(200).json({
    ok: true,
    events,
  });
};

const createEvent = async (req, res = response) => {
  const event = new Event(req.body);
  try {
    event.user = req.uid;
    const eventCreated = await event.save();
    res.json({
      ok: true,
      event: eventCreated,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Talk with the admin",
    });
  }
};

const updateEvent = async (req, res = response) => {
  const eventID = req.params.id;
  const uid = req.uid;
  try {
    const event = await Event.findById(eventID);
    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "Event with that id didn't exists",
      });
    }
    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "Dont have privilage to edit this event",
      });
    }

    const newEvent = {
      ...req.body,
      user: uid,
    };

    const updatedEvent = await Event.findByIdAndUpdate(eventID, newEvent, {
      new: true,
    });
    res.json({
      ok: true,
      evento: updatedEvent,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Talk with the admin",
    });
  }
};

const deleteEvent = async (req, res = response) => {
  const eventID = req.params.id;
  const uid = req.uid;
  try {
    const event = await Event.findById(eventID);
    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "Event with that id didn't exists",
      });
    }
    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "Dont have privilage to delete this event",
      });
    }
    await Event.findByIdAndDelete(eventID);
    res.json({ ok: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Talk with the admin",
    });
  }
};

module.exports = { getEvents, createEvent, updateEvent, deleteEvent };
