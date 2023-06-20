function ChatMessage({ message }) {
  return (
    <li className={`rounded bg-green-950 px-4 py-1 my-1`}>
      {message.from}:{message.body}
    </li>
  );
}
export default ChatMessage;
