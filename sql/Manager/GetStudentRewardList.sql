select r.*,s.first_name,s.last_name,s.sid
from ((student s) inner join (got_reward gr) on s.sid=gr.studentid) inner join (reward r) on r.rid=gr.rewardid
where
    and s.entry_year >= ? and s.entry_year <= ? 
    and s.mid = ?
;