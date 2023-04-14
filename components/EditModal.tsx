import useCurrentUser from "@/hooks/useCurrentUser"
import useEditModal from "@/hooks/useEditModal"
import useUser from "@/hooks/useUser"
import { useState, useEffect, useCallback } from "react"
import { toast } from "react-hot-toast"
import axios from "axios"
import Modal from "./Modal"
import Input from "./Input"
import ImageUpload from "./ImageUpload"

const EditModal = () => {

    const { data: currentUser } = useCurrentUser()
    const { mutate: mutateFetchedUser } = useUser(currentUser?.id)
    const editModal = useEditModal()

    const [profileImage, setProfileImage] = useState('')
    const [coverImage, setCoverImage] = useState('')
    const [name, setName] = useState('')
    const [bio, setBio] = useState('')
    const [username, setUsername] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setProfileImage(currentUser?.profileImage)
        setCoverImage(currentUser?.coverImage)
        setBio(currentUser?.bio)
        setUsername(currentUser?.username)
        setName(currentUser?.name)
    }, [currentUser?.profileImage, currentUser?.coverImage,
    currentUser?.bio, currentUser?.username, currentUser?.name
    ])

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true)
            await axios.patch('/api/edit', {
                name,
                username,
                bio,
                profileImage,
                coverImage,
            })
            mutateFetchedUser()
            toast.success('Updated successfully')
            editModal.onClose()
        } catch (error) {
            toast.error('Something went wrong')
            setIsLoading(false)
        }
    }, [name,
        username,
        bio, editModal, mutateFetchedUser,
        profileImage,
        coverImage,])


    const bodyContent = (
        <div className="flex flex-col gap-4">
            <ImageUpload disabled={isLoading}
                value={coverImage}
                onChange={(image) => setCoverImage(image)}
                label="Upload Cover Image"
            />
            <ImageUpload disabled={isLoading}
                value={profileImage}
                onChange={(image) => setProfileImage(image)}
                label="Upload Profile Image"
            />
            <Input
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                disabled={isLoading}
            />
            <Input
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                disabled={isLoading}
            />
            <Input
                placeholder="Bio"
                onChange={(e) => setBio(e.target.value)}
                value={bio}
                disabled={isLoading}
            />
        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={editModal.isOpen}
            title="Edit Your profile"
            actionLabel="Save"
            onClose={editModal.onClose}
            onSubmit={onSubmit}
            body={bodyContent}
        />
    )
}

export default EditModal