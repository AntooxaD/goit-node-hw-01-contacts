const { program } = require("commander");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} = require("./contact");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  try {
    switch (action) {
      case "list":
        const contacts = await listContacts();
        console.log(contacts);
        break;

      case "get":
        const contact = await getContactById(id);
        console.log(contact);
        break;

      case "add":
        const newContact = await addContact(name, email, phone);
        console.log(newContact);
        break;

      case "remove":
        const delContact = await removeContact(id);
        console.log(delContact);
        break;

      default:
        console.warn("\x1B[31m Unknown action type!");
    }
  } catch (err) {
    console.warn(`\x1B[31m ${err.message}!`);
  }
}
invokeAction(argv);
