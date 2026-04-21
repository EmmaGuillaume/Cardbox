export default function FriendsList() {
  const users = ['Hugoninou', 'Emmanounou', 'Léoninou', 'Tiboninou', 'Paul_Louninou'];

  return (
    <ul className="p-3 flex flex-col gap-2">
      {users.map((name) => (
        <li key={name} className="flex items-center justify-between bg-white/5 rounded-xl px-4 py-3">
          <div className="flex items-center gap-3">
            <img src={`https://i.pravatar.cc/40?u=${name}`} alt={name}
              className="w-10 h-10 rounded-full object-cover" />
            <span className="text-white font-medium">{name}</span>
          </div>
          <button className="text-sm text-white/70 border border-white/20 rounded-lg px-3 py-1 hover:bg-white/10 transition-colors">
            Following
          </button>
        </li>
      ))}
    </ul>
  );
}