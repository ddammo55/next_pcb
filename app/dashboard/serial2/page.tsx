// pages/index.jsx

export default function Home() {
    const handleSubmit = async (event) => {
      event.preventDefault();
      const quantity = event.target.quantity.value;
      const boardName = event.target.boardName.value;
  
      // Call the server action
      await fetch('/api/generateSerialNumbers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity, boardName }),
      });
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <input type="number" id="quantity" name="quantity" required />
        <select name="boardName" id="boardName" required>
          <option value="board1">Board 1</option>
          <option value="board2">Board 2</option>
          {/* Add more board options here */}
        </select>
        <button type="submit">Submit</button>
      </form>
    );
  }
  