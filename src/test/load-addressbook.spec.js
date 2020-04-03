import { Selector } from "testcafe";

fixture("Load AddressBook").page`http://localhost:3000`;

const Document = "./fixture/maersk-bill-of-lading.tt";
const AddressBook = "./fixture/local-addressbook.csv";

const TitleTransferPanel = Selector("#title-transfer-panel");
const BeneficiaryName = Selector("[class^='TitleView']:nth-of-type(1)").find("h5");
const HolderName = Selector("[class^='TitleView']:nth-of-type(2)").find("h5");
const OverlayAddressBook = Selector("#overlay-addressbook");
const OverlayAddressBookTableBodyRows = Selector("#overlay-addressbook tbody tr");
const OverlayAddressBookTableFirstRow = Selector("#overlay-addressbook tbody tr:first-of-type");
const OverlayAddressBookSearchInput = Selector("#overlay-addressbook input[type='text']");
const ButtonUploadAddressBook = Selector("#template-tabs-list button").withText("Address Book");
const CSVFileInput = Selector("#csv-file-input");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(async (prev, curr) => t.expect(component.textContent).contains(curr), Promise.resolve());

test("AddressBook local names to be resolved correctly, search filtered to 1", async (t) => {
  await t.setFilesToUpload("input[type=file]", [Document]);
  await TitleTransferPanel.with({ visibilityCheck: true })();
  await t.expect(ButtonUploadAddressBook.count).eql(1);

  await t.click(ButtonUploadAddressBook);
  await OverlayAddressBook.with({ visibilityCheck: true })();
  await validateTextContent(t, OverlayAddressBookTableFirstRow.find("td"), ["No Address found."]);

  await t.setFilesToUpload(CSVFileInput, [AddressBook]);
  await t.expect(OverlayAddressBookTableBodyRows.count).notEql(0);
  await validateTextContent(t, BeneficiaryName, ["Bank of China"]);
  await validateTextContent(t, HolderName, ["DBS"]);

  await t.typeText(OverlayAddressBookSearchInput, "Bank of China");
  await t.expect(OverlayAddressBookTableFirstRow.visible).ok();
  await t.expect(OverlayAddressBookTableFirstRow.nextSibling().visible).notOk();
});