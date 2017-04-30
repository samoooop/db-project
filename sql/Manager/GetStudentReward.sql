select r.name as rewardName,r.date as rewardDate
from student s inner join got_reward gr on s.sid=gr.studentid inner join reward r on r.rid=gr.rewardid
where s.sid= ?
;