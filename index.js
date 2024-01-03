const express = require("express");
const app = express();
const db = require("./db");
const { v4: uuidv4 } = require("uuid");
const contentCollection = require("./model/notes");
const bodyparser = require("body-parser");

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.post("/addNotes", async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res
        .status(400)
        .send({ status: 400, message: "Please enter title and content" });
    }
    const contentDocument = await contentCollection({
      id: uuidv4(),
      title: title,
      timeStamp: new Date().toUTCString(),
      content: content,
    }).save();

    return res
      .status(200)
      .send({ status: 200, message: "Successfully Inserted data" });
  } catch (err) {
    return res
      .status(500)
      .send({ status: 500, message: "Internal Server Error" });
  }
});

app.get("/getNotes/:id", async (req, res) => {
  try {
    const { id } = req.params; // Changed from noteId to id
    var filter = {};
    if (id) {
      filter = {
        id: id,
      };
    }
    const data = await contentCollection.find(filter);
    if (data) {
      return res.status(200).send({ status: 200, data: data });
    } else {
      return res
        .status(400)
        .send({ status: 400, message: "Something went wrong" });
    }
  } catch (err) {
    return res
      .status(500)
      .send({ status: 500, message: "Internal Server Error" });
  }
});

app.get("/updateNotes", async (req, res) => {
  try {
    const { title, content, id } = req.body;
    var filter = {
      id: id,
    };
    const data = await contentCollection.updateOne(filter, {
      $set: {
        title: title,
        content: content,
        timeStamp: new Date().toUTCString(),
      },
    });
    if (data.modifiedCount) {
      return res
        .status(200)
        .send({ status: 200, message: "Successfully Update" });
    } else {
      return res
        .status(400)
        .send({ status: 400, message: "Something went wrong" });
    }
  } catch (err) {
    return res
      .status(500)
      .send({ status: 500, message: "Internal Server Error" });
  }
});

app.delete("/deleteNotes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    var filter = {
      id: id,
    };
    const data = await contentCollection.deleteOne(filter);
    if (data.deletedCount) {
      return res
        .status(200)
        .send({ status: 200, message: "Successfully Deleted" });
    } else {
      return res
        .status(400)
        .send({ status: 400, message: "Something went wrong" });
    }
  } catch (err) {
    return res
      .status(500)
      .send({ status: 500, message: "Internal Server Error" });
  }
});

app.listen(8000, () => {
  console.log("Server is running on 8000");
});
