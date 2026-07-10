/**
 * PASSPRIVÉ — Launch popup → Google Sheet capture
 * ------------------------------------------------
 * This Google Apps Script receives submissions from the launch popup and
 * appends each one as a row in a Google Sheet.
 *
 * SETUP (one time, ~3 minutes):
 *
 * 1. Create a new Google Sheet (sheets.new). Name it e.g. "PASSPRIVÉ Launch List".
 * 2. In the Sheet, go to  Extensions → Apps Script.
 * 3. Delete any starter code, paste THIS entire file, and Save.
 * 4. Click  Deploy → New deployment.
 *      - Select type:  Web app
 *      - Description:   Launch signups
 *      - Execute as:    Me
 *      - Who has access: Anyone
 *    Click Deploy and authorize when prompted.
 * 5. Copy the "Web app URL" it gives you (ends in /exec).
 * 6. Put that URL in your project's environment as:
 *      NEXT_PUBLIC_LAUNCH_SHEET_URL=https://script.google.com/macros/s/XXXX/exec
 *    - Locally: add it to .env.local
 *    - On Vercel: Project → Settings → Environment Variables, then redeploy.
 *
 * The first row of headers is created automatically on the first submission.
 * Duplicate phone numbers (or emails) are detected and skipped automatically.
 *
 * NOTE: If you edit this script later, you must redeploy a NEW VERSION:
 *   Deploy → Manage deployments → (edit) → Version: New version → Deploy.
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];

    // Ensure header row exists.
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Name', 'Phone', 'Email', 'Type', 'Source Page']);
    }

    var data = {};
    try {
      data = JSON.parse(e.postData.contents);
    } catch (err) {
      data = e.parameter || {};
    }

    // Duplicate check: skip if this phone (or email, if given) is already on the list.
    var newPhone = normalize_(data.phone);
    var newEmail = normalize_(data.email);
    if (sheet.getLastRow() > 1) {
      var rows = sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).getValues();
      for (var i = 0; i < rows.length; i++) {
        var existingPhone = normalize_(rows[i][2]); // Phone column
        var existingEmail = normalize_(rows[i][3]); // Email column
        var phoneMatch = newPhone && existingPhone === newPhone;
        var emailMatch = newEmail && existingEmail === newEmail;
        if (phoneMatch || emailMatch) {
          return ContentService
            .createTextOutput(JSON.stringify({ result: 'duplicate' }))
            .setMimeType(ContentService.MimeType.JSON);
        }
      }
    }

    sheet.appendRow([
      data.submitted_at || new Date().toLocaleString(),
      data.name || '',
      data.phone || '',
      data.email || '',
      data.type || '',
      data.source || '',
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', error: String(error) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

// Normalizes a value for duplicate comparison: lowercased, digits/letters only.
function normalize_(value) {
  if (value === null || value === undefined) return '';
  return String(value).toLowerCase().replace(/[^a-z0-9]/g, '');
}

// Lets you open the /exec URL in a browser to confirm the app is live.
function doGet() {
  return ContentService.createTextOutput('PASSPRIVÉ launch capture is running.');
}
