select student.entry_year as year,count(student.sid) as result from student 
where student.tid = ?
group by student.entry_year;