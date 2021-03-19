async function getAllEmails() {
    const resp = await fetch('http://localhost:8082/api/messages');
    return resp.json();
}

async function addOneEmail(newItem) {
    const resp = await fetch('http://localhost:8082/api/messages', {
        method: 'POST',
        body: JSON.stringify(newItem),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      });
    return resp.json();
}

async function updateOneEmail(item) {
    const resp = await fetch(`http://localhost:8082/api/messages`, {
        method: 'PATCH',
        body: JSON.stringify(item),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
    });
    return resp.json();
}

export { getAllEmails, addOneEmail, updateOneEmail }