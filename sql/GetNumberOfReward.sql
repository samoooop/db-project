select count(got_reward.studentid) AS result,year(student.since)
from student inner join got_reward on student.sid = got_reward.studentid
group by year(student.since);