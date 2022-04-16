const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const filePath = path.join(__dirname, "db/contact.json");

async function listContacts() {
  const data = await fs.readFile(filePath);
  const contacts = JSON.parse(data);
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find((item) => item.id === contactId);
  if (!contact) {
    throw new Error(`${contactId} not found`);
  }
  return contact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === contactId);
  if (idx === -1) {
    return null;
  }
  const delContact = contacts.filter((_, index) => index !== idx);
  await fs.writeFile(filePath, JSON.stringify(delContact));
  return contacts[idx];
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    name,
    email,
    phone,
    id: nanoid(),
  };
  contacts.push(newContact);
  await fs.writeFile(filePath, JSON.stringify(contacts));
  return newContact;
}

module.exports = { listContacts, getContactById, removeContact, addContact };
