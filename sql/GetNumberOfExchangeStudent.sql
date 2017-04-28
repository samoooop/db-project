select count(student.sid) as result, student.entry_year as year 
from student,take_leave
where student.sid = take_leave.l_sid 
    and take_leave.until > current_date() 
    and take_leave.since < current_date() 
    and take_leave.leave_type = "Exchange"
group by student.entry_year
;