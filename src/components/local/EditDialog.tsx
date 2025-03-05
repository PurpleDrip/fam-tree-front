import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateNode } from "@/store/userSlice";

export default function UseEdit({ children, id }) {
  const dispatch = useDispatch();
  const node = useSelector((state) =>
    state.user.nodes.find((node) => node.id === id)
  );

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (node) {
      setFormData(node.data);
    }
  }, [node, open]); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    dispatch(updateNode({ id, data: formData }));
    setOpen(false); 
  };

  return (
    <div>
      <div onClick={() => setOpen(true)}>{children}</div>

      {open && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-black p-6 rounded-lg shadow-lg w-[400px] border">
            <h1 className="text-lg font-bold">Edit Profile</h1>
            <p className="text-sm text-gray-400">Make changes to your profile here. Click save when you're done.</p>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name || ""}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title || ""}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button className="bg-red-400" onClick={() => setOpen(false)}>Cancel</Button>
              <Button variant="outline" className="text-black" onClick={handleSave}>Save Changes</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
