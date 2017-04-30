select tid,m.mid
from teacher t left join major m on t.tid = m.managed_tid
where tid = ?
