select course.cid, course.courseName, sem_consist_course.grade
			, concat(concat(substring(semester.semid,1,4),'/'),substring(semester.semid,5,1)) as term
			, sem_consist_course.status
from semester,sem_consist_course,course
where semester.sem_sid = ? and sem_consist_course.student_id = semester.sem_sid and semester.semid=sem_consist_course.semester_id and sem_consist_course.course_id = course.cid
;