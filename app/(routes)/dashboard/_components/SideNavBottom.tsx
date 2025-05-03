import {
  Archive,
  Book,
  EraserIcon,
  Github,
  icons,
  Layers3,
  Lock,
  MoveDownIcon,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useConvex, useMutation } from "convex/react";
import { useContext, useEffect, useState } from "react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { api } from "@/convex/_generated/api";
import { json } from "stream/consumers";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import { useFileList } from "@/app/hooks/useFileList";
import { FileListContext } from "@/app/_context/FilesListContext";
import { useTeamFiles } from "@/app/hooks/useTeamFiles";

export default function SideNavBottom({}) {
  const [fileName, setFileName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const menu = [
    {
      name: "Eraserbot",
      icon: <EraserIcon />,
      path: "",
    },
    {
      name: "AI References",
      icon: <Book />,
      path: "",
    },
    {
      name: "Team Templets",
      icon: <Layers3 />,
      path: "",
    },
    {
      name: "Github Sync",
      icon: <Github />,
      path: "",
    },
    {
      name: "Private Files",
      icon: <Lock />,
      path: "",
    },
    {
      name: "Archive",
      icon: <Archive />,
      path: "",
    },
  ];

  const { getFiles } = useContext(FileListContext);

  const { data: files, refetch } = useTeamFiles(getFiles);

  const { user } = useKindeBrowserClient();

  const createFile = useMutation(api.files.createFile);

  const handleCreateFile = () => {
    if (!fileName || !getFiles || !user?.email) return;

    createFile({
      fileName,
      teamId: getFiles,
      createdBy: user?.email,
      archive: false,
      document: "",
      whiteboard: "",
      edited:""
    }).then((res) => {
      // console.log(res);
      if (res) {
        toast.success("File added successfully!!!");
        setIsOpen(false);
        setFileName("");
        refetch();
      } else {
        toast("there were somthing wrong while adding the file!");
      }
    });

  };

  return (
    <div>
      {menu.map((item, i) => (
        <h1 key={i} className="text-lg flex space-x-2 space-y-5">
          <p className="text-lg cursor-pointer">{item.icon}</p>
          <p className="text-lg cursor-pointer">{item.name}</p>
        </h1>
      ))}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            disabled={files?.length == 5}
            className="bg-blue-700 rounded-2xl flex justify-between p-4 cursor-pointer"
          >
            <p>New File </p>
            <p>
              <MoveDownIcon />
            </p>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add file name:</DialogTitle>
            <DialogDescription>
              <Input
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                placeholder="enter your file name please"
              />
              <Button
                onClick={() => handleCreateFile()}
                className=" mt-4 cursor-pointer"
              >
                submit
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <div className="mt-10 space-y-3">
        <div>
          <div>
          <Progress value={files?.length ? files.length * 20 : 0} />
          </div>
        </div>
        <div className="text-sm">
          <p>
            <strong>{files?.length}</strong> out of <strong>5</strong> files
            used
          </p>
          <p>upgrade your plan for unlimited access</p>
        </div>
      </div>
    </div>
  );
}
