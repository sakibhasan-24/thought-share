import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useAdminRequest from "../../hook/useAdminRequest";

export default function RequestAdmin() {
  const { currentUser } = useSelector((state) => state.user);
  const [openModal, setOpenModal] = useState(false);
  const [email, setEmail] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const { loading, adminRequest } = useAdminRequest();
  const handleIsChecked = (e) => {
    setIsChecked(e.target.checked);
  };
  function onCloseModal() {
    setOpenModal(false);
    setEmail("");
  }

  useEffect(() => {
    setTimeout(() => {
      setOpenModal(true);
    }, 2000);
  }, []);

  const handleSendRequest = async () => {
    if (currentUser) {
      await adminRequest();
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-12">
      <Button onClick={() => setOpenModal(true)}>Send Request</Button>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Your email
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Your email" />
              </div>
              <TextInput
                id="email"
                // placeholder="name@company.com"
                defaultValue={currentUser?.email || email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="userName" value=" userName" />
              </div>
              <TextInput
                id="userName"
                defaultValue={currentUser?.userName}
                type="userName"
                required
              />
            </div>
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <Checkbox
                  value={isChecked}
                  onChange={handleIsChecked}
                  id="accept"
                />
                <Label htmlFor="accept">Accept Term and policy</Label>
              </div>
              <Link
                to="/dashboard/profile"
                className="text-sm text-cyan-700 hover:underline dark:text-cyan-500"
              >
                Go <span>Profile</span>
              </Link>
            </div>
            <div className="w-full">
              <Button onClick={handleSendRequest} disabled={!isChecked}>
                Send Request
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
