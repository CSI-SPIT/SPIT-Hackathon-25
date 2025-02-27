"use client";
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RiAddLine, RiDeleteBinLine, RiSaveLine, RiLinkedinFill, RiInstagramLine } from 'react-icons/ri';
import axios from 'axios';

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

interface TeamMember {
  _id?: string;
  name: string;
  linkedIn?: string;
  instagram?: string;
}

interface TeamMembersProps {
  teamId: string;
  teamName: string;
  members: TeamMember[];
  isEditing: boolean;
  onUpdateComplete: () => void;
}

const TeamMembers: React.FC<TeamMembersProps> = ({
  teamId,
  teamName,
  members,
  isEditing,
  onUpdateComplete,
}) => {
  const [editedTeamName, setEditedTeamName] = useState(teamName);
  const [editedMembers, setEditedMembers] = useState<TeamMember[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateMessage, setUpdateMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    setEditedTeamName(teamName);
    setEditedMembers([...members]);
  }, [teamName, members, isEditing]);

  const handleMemberChange = (index: number, field: keyof TeamMember, value: string) => {
    const updatedMembers = [...editedMembers];
    updatedMembers[index] = { ...updatedMembers[index], [field]: value };
    setEditedMembers(updatedMembers);
  };

  const handleAddMember = () => {
    setEditedMembers([...editedMembers, { name: '', linkedIn: '', instagram: '' }]);
  };

  const handleRemoveMember = (index: number) => {
    const updatedMembers = [...editedMembers];
    updatedMembers.splice(index, 1);
    setEditedMembers(updatedMembers);
  };

  const handleSubmitUpdate = async () => {
    setIsUpdating(true);
    setUpdateMessage(null);

    try {
      const token = localStorage.getItem('authToken');

      const filteredMembers = editedMembers.filter(member => member.name.trim() !== '');

      const response = await axios.post(
        `${SERVER_URL}/admin/team/${teamId}`,
        {
          teamName: editedTeamName,
          members: filteredMembers
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        }
      );

      if (response.data.success) {
        setUpdateMessage({ text: 'Team updated successfully!', type: 'success' });
        setTimeout(() => {
          onUpdateComplete();
        }, 1000);
      } else {
        setUpdateMessage({ text: 'Failed to update team', type: 'error' });
      }
    } catch (error) {
      console.error('Error updating team:', error);
      setUpdateMessage({ text: 'An error occurred while updating the team', type: 'error' });
    } finally {
      setIsUpdating(false);
    }
  };

  // Render members in read-only mode
  const renderMembersReadOnly = () => {
    return (
      <div className="space-y-4">
        {members && members.length > 0 ? (
          members.map((member) => (
            <div key={member._id} className="bg-[#1d2029] p-4 rounded-lg border border-gray-800">
              <div className="flex justify-between items-center">
                <h5 className="text-white font-medium">{member.name}</h5>
                <div className="flex gap-2">
                  {member.linkedIn && (
                    <a
                      href={member.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm bg-[#0A66C2]/20 text-[#0A66C2] px-3 py-1 rounded-full hover:bg-[#0A66C2]/30 transition-colors"
                    >
                      <RiLinkedinFill className="h-4 w-4" />
                      LinkedIn
                    </a>
                  )}
                  {member.instagram && (
                    <a
                      href={member.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm bg-[#E1306C]/20 text-[#E1306C] px-3 py-1 rounded-full hover:bg-[#E1306C]/30 transition-colors"
                    >
                      <RiInstagramLine className="h-4 w-4" />
                      Instagram
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-[#1d2029] p-4 rounded-lg border border-gray-800 text-center text-gray-500">
            No team members listed
          </div>
        )}
      </div>
    );
  };

  // Render editable members form
  const renderMembersEditable = () => {
    return (
      <div className="space-y-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-400 mb-1">Team Name</label>
          <Input
            value={editedTeamName}
            onChange={(e) => setEditedTeamName(e.target.value)}
            className="bg-[#1d2029] border-gray-800 text-gray-200"
          />
        </div>

        {editedMembers.map((member, index) => (
          <div key={index} className="bg-[#1d2029] p-4 rounded-lg border border-gray-800">
            <div className="flex justify-between items-center mb-3">
              <h5 className="text-gray-300 font-medium">Member {index + 1}</h5>
              <Button
                onClick={() => handleRemoveMember(index)}
                className="bg-red-500/10 hover:bg-red-500/20 text-red-400"
                variant="ghost"
                size="sm"
              >
                <RiDeleteBinLine />
              </Button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Name</label>
                <Input
                  value={member.name}
                  onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                  className="bg-[#1d2029] border-gray-800 text-gray-200"
                  placeholder="Member name"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1">LinkedIn URL</label>
                <Input
                  value={member.linkedIn || ''}
                  onChange={(e) => handleMemberChange(index, 'linkedIn', e.target.value)}
                  className="bg-[#1d2029] border-gray-800 text-gray-200"
                  placeholder="https://linkedin.com/in/profile"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1">Instagram URL</label>
                <Input
                  value={member.instagram || ''}
                  onChange={(e) => handleMemberChange(index, 'instagram', e.target.value)}
                  className="bg-[#1d2029] border-gray-800 text-gray-200"
                  placeholder="https://instagram.com/username"
                />
              </div>
            </div>
          </div>
        ))}

        {editedMembers.length === 0 && (
          <div className="bg-[#1d2029] p-4 rounded-lg border border-gray-800 text-center text-gray-500">
            No team members added. Click "Add Member" to add team members.
          </div>
        )}

        <div className="flex justify-between mt-4">
          <Button
            onClick={handleAddMember}
            className="bg-[#a5f0d3]/20 hover:bg-[#a5f0d3]/30 text-[#a5f0d3]"
            variant="ghost"
            size="sm"
          >
            Add Member <RiAddLine className="ml-1" />
          </Button>

          <Button
            onClick={handleSubmitUpdate}
            className="bg-[#a5f0d3] hover:bg-[#8ad3b8] text-[#1d2029] font-medium"
            disabled={isUpdating}
          >
            {isUpdating ? (
              <>
                <div className="inline-block animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-[#1d2029] mr-2"></div>
                Updating...
              </>
            ) : (
              <>
                <RiSaveLine className="mr-1" /> Save Changes
              </>
            )}
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div>
      {updateMessage && (
        <div className={`mb-4 p-3 rounded-lg ${updateMessage.type === 'success' ? 'bg-green-500/10 border border-green-500 text-green-400' : 'bg-red-500/10 border border-red-500 text-red-400'}`}>
          {updateMessage.text}
        </div>
      )}

      {isEditing ? renderMembersEditable() : renderMembersReadOnly()}
    </div>
  );
};

export default TeamMembers;
