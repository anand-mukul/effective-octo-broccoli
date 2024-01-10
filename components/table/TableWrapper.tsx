'use client'

import { FileType } from '@/typings';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/table/Table';
import { columns } from '@/components/table/columns';
import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, orderBy, query } from 'firebase/firestore';
import { db } from '@/firebase';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronsUpDown } from 'lucide-react';

function TableWrapper({ skeletonFiles }: { skeletonFiles: FileType[] }) {
    // Retrieve user information using useUser hook from Clerk
    const { user } = useUser();

    // State for initial files and sorting
    const [initialFiles, setInitialFiles] = useState<FileType[]>([]);
    const [sort, setSort] = useState<"asc" | "desc">("desc");

    // Fetch user's files from Firestore collection
    const [docs, loading, error] = useCollection(
        user &&
        query(
            collection(db, "users", user.id, "files"),
            orderBy("timestamp", sort)
        )
    );

    // Update files when documents change
    useEffect(() => {
        if (!docs) return;

        // Map Firestore documents to FileType
        const files: FileType[] = docs.docs.map(doc => ({
            id: doc.id,
            filename: doc.data().filename || doc.id,
            timestamp: new Date(doc.data().timestamp?.seconds * 1000) || undefined,
            fullName: doc.data().fullName,
            downloadURL: doc.data().downloadURL,
            type: doc.data().type,
            size: doc.data().size,
        }))

        setInitialFiles(files);
    }, [docs]);

    // Render skeleton loading UI if documents are still loading
    if (!docs || loading) {
        return (
            <div className='flex flex-col space-y-5 px-4 sm:px-10 md:px-20 lg:px-32 xl:px-40'>
                <div className="font-bold">All Files</div>
                {/* Skeleton button */}
                <Button
                variant={'outline'}
                className='ml-auto w-fit mb-3 sm:mb-0'
                onClick={() => setSort(sort === "desc" ? "asc" : "desc")}
            >
                Sort By {sort === "desc" ? "Newest" : "Oldest"}<ChevronsUpDown size={15} className='ml-1.5'/>
            </Button>

                {/* Render skeleton files */}
                <div className="border rounded-lg">
                    <div className="border-b h-12" />
                    {skeletonFiles.map((file) => (
                        <div
                            key={file.id}
                            className="flex items-center space-x-4 p-5 w-full">
                            <Skeleton className='h-12 w-[10%]' />
                            <Skeleton className='h-12 w-[20%]' />
                            <Skeleton className='h-12 w-[20%]' />
                            <Skeleton className='h-12 w-[20%]' />
                            <Skeleton className='h-12 w-[15%]' />
                            <Skeleton className='h-12 w-[15%]' />
                        </div>
                    ))}

                    {skeletonFiles.length === 0 && (
                        <div className="flex items-center space-x-4 p-5 w-full">
                            <Skeleton className='h-12 w-[10%]' />
                            <Skeleton className='h-12 w-[20%]' />
                            <Skeleton className='h-12 w-[20%]' />
                            <Skeleton className='h-12 w-[20%]' />
                            <Skeleton className='h-12 w-[15%]' />
                            <Skeleton className='h-12 w-[15%]' />
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // Render table when documents are loaded
    return (
        <div className='flex flex-col space-y-5 px-4 sm:px-10 md:px-4 lg:px-32 xl:px-40'>
    <div className="font-bold">All Files</div>
    {/* Sort button */}
    <Button
        variant={'outline'}
        className='ml-auto w-fit mb-3 sm:mb-0'
        onClick={() => setSort(sort === "desc" ? "asc" : "desc")}
    >
        Sort By {sort === "desc" ? "Newest" : "Oldest"}<ChevronsUpDown size={15} className='ml-1.5'/>
    </Button>

    {/* Display files in a table */}
    <div className="overflow-x-auto  items-center justify-center">
        <DataTable columns={columns} data={initialFiles}/>
    </div>
</div>
    );
}

export default TableWrapper;