"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import { api } from "@/convex/_generated/api";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

export default function CreateTeam() {
  const [teamName, setTeamName] = useState("");

  const createTeam = useMutation(api.teams.createTeam);
  const { user } = useKindeBrowserClient();
    // console.log(user)
  const router = useRouter();

  const handleSubmit = () => {
    createTeam({
      teamName: teamName,
      createdBy: user?.given_name || "",
      email:user?.email || ""
    }).then((resp) => {
      console.log(resp);
      toast("team create successfully");
      if (resp) {
        router.push("/dashboard");
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
            What should we call your team?
          </h2>
          <p className="text-sm text-gray-500">
            You can change this later from settings.
          </p>
        </div>

        <div className="space-y-4">
          <label
            htmlFor="teamName"
            className="block text-sm font-medium text-gray-700"
          >
            Team Name
          </label>
          <Input
            id="teamName"
            
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="Enter your team name"
            className="w-full text-black"
          />
          <Button disabled={!(teamName && teamName?.length>0)} className="w-full bg-blue-700" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}
