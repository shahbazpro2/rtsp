import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from 'react';
import { useSelectAtom } from "../../../../app/settings/page";

const Storage = () => {
    const [path, setPath] = useSelectAtom('path')
    return (
        <div>
            <Label className="">Storage Path</Label>
            <Input
                type="text"
                className="mt-2"
                value={path}
                onChange={(e) => setPath(e.target.value)}
            />
        </div>
    )
}

export default Storage
