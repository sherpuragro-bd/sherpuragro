const AdminPageHeader = ({ icon, title, children }) => {
  return (
    <>
      <div className="w-full border">
        <div className="flex px-5 py-2 items-center justify-between w-full">
          <h2 className="text-2xl flex items-center gap-3">
            <icon.icon
              strokeWidth={1.6}
              size={40}
              className="p-2 bg-primary/10 border rounded-md"
            />
            {title}
          </h2>
          <div className="flex gap-3">{children}</div>
        </div>
      </div>
    </>
  );
};

export default AdminPageHeader;
