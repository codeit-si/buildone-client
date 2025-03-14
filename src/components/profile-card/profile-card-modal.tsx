import { Dispatch, SetStateAction, useRef, useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";

import { getProfileCardInfoOptions } from "@/services/profile/query";
import { useUserStore } from "@/store/user-store";

import Modal from "../@common/portal/modal";

import ProfileCardActions from "./profile-card-actions";
import ProfileCardContent from "./profile-card-content";

interface ProfileCardModalProps {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  shouldFetch: boolean;
}

export default function ProfileCardModal({
  open,
  onOpenChange,
  shouldFetch,
}: ProfileCardModalProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { data } = useQuery(getProfileCardInfoOptions(shouldFetch));

  const userInfo = useUserStore().userInformation;

  useEffect(() => {
    if (open) {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 2000);

      return () => clearTimeout(timer);
    }
  }, [open]);

  return (
    <Modal.Root open={open} onOpenChange={onOpenChange}>
      <Modal.Content
        className="!md:rounded-24 h-auto w-auto !gap-0 !rounded-18 !border-none !bg-transparent !p-0 !shadow-none"
        hasCloseIcon={false}
      >
        <div className="flex flex-col items-center">
          <ProfileCardContent
            cardRef={cardRef}
            loading={isLoading}
            userName={userInfo?.name || ""}
            streakGrade={userInfo?.streakGrade || 0}
            data={data}
          />
          {!isLoading && (
            <ProfileCardActions
              cardRef={cardRef}
              userName={userInfo?.name || ""}
            />
          )}
        </div>
      </Modal.Content>
    </Modal.Root>
  );
}
