import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Sidebar from "./Sidebar";
import { Song } from "@/types/schema";
import { GiHamburgerMenu } from "react-icons/gi";

interface SheetSideBarProps {
  songs: Song[];
}

const SheetSideBar: React.FC<SheetSideBarProps> = ({ songs }) => {
  return (
    <Sheet>
      <SheetTrigger>
        <div className="bg-black rounded-full p-2 hover:text-black hover:bg-white hover:opacity-75 duration-300">
          <GiHamburgerMenu />
        </div>
      </SheetTrigger>
      <SheetContent side={"left"} className="bg-black h-full w-fit">
        <Sidebar songs={songs} />
      </SheetContent>
    </Sheet>
  );
};

export default SheetSideBar;
