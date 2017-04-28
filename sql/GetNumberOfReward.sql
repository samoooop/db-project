select count(got_reward.studentid) AS result,student.entry_year
from student inner join got_reward on student.sid = got_reward.studentid
group by student.entry_year;