import {Badge} from "react-bootstrap";
import {COMPLETED, NEEDS_UPDATE, PENDING_SUBMISSION, RESUBMITTED, Status} from "../../types/types.ts";

function StatusBadge({status}: { status: Status }) {

   const getColor = () => {
      if (status === COMPLETED)
         return 'success'
      else if (status === NEEDS_UPDATE)
         return 'danger'
      else if(status === PENDING_SUBMISSION)
         return 'warning'
      else if(status===RESUBMITTED)
         return 'primary'
      return 'info'
   }
   return <Badge pill={true} bg={getColor()} style={{fontSize: "1em"}}>
      {status}
   </Badge>
}

export default StatusBadge;