import DropZone from '@/components/DropZone'
import TableWrapper from '@/components/table/TableWrapper';
import Header from '@/components/ui/(default)/header';
import { db } from '@/firebase';
import { FileType } from '@/typings';
import { auth } from '@clerk/nextjs'
import { collection, getDocs } from 'firebase/firestore';

async function DashboardPage() {
  const { userId } = auth();

  const docsResults = await getDocs(collection(db, "users", userId!, "files"));

  const skeletonFiles: FileType[] = docsResults.docs.map((doc) => ({
    id: doc.id,
    filename: doc.data().filename || doc.id,
    timestamp: new Date(doc.data().timestamp?.seconds * 1000) || undefined,
    fullName: doc.data().fullName,
    downloadURL: doc.data().downloadURL,
    type: doc.data().type,
    size: doc.data().size,
  }));

  return (
    <>
      <Header />
      
      <div className="mt-24">
       
       <DropZone />
        <section className='container space-y-5'>
          <div>
            <TableWrapper
              skeletonFiles={skeletonFiles}
            />
          </div>
        </section>
      </div>
    </>
  )
}
export default DashboardPage;