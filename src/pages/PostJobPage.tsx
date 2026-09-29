import { useState } from 'react';
import { ArrowLeft, Send, Tag } from 'lucide-react';
import { categories } from '@/lib/mockData';
import { navigate } from '@/lib/router';
import { Button } from '@/components/ui/Button';
import { Input, Textarea, Select } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { useToast } from '@/context/ToastContext';
import { useAuth } from '@/context/AuthContext';

export function PostJobPage() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [budgetMin, setBudgetMin] = useState('');
  const [budgetMax, setBudgetMax] = useState('');
  const [deadline, setDeadline] = useState('');
  const [experience, setExperience] = useState('Intermediate');
  const [skillInput, setSkillInput] = useState('');
  const [skills, setSkills] = useState<string[]>([]);

  const addSkill = () => {
    const s = skillInput.trim();
    if (s && !skills.includes(s)) {
      setSkills([...skills, s]);
      setSkillInput('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !category || !budgetMin || !budgetMax) {
      toast('Please fill in all required fields', 'error');
      return;
    }
    toast('Job posted successfully! Freelancers can now submit proposals.');
    navigate('/jobs');
  };

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-32 text-center">
        <h1 className="text-2xl font-bold text-ink-900 dark:text-white mb-4">Please sign in to post a job</h1>
        <Button onClick={() => navigate('/login')}>Sign In</Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <button onClick={() => navigate('/jobs')} className="flex items-center gap-2 text-sm text-ink-400 hover:text-primary-500 mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Jobs
      </button>

      <h1 className="font-display text-3xl font-bold text-ink-900 dark:text-white mb-2">Post a Job</h1>
      <p className="text-ink-500 dark:text-ink-400 mb-8">Describe your project and get proposals from talented freelancers</p>

      <form onSubmit={handleSubmit} className="glass-strong rounded-2xl p-6 sm:p-8 space-y-5">
        <Input
          label="Job Title"
          placeholder="e.g. Need a React developer for a SaaS dashboard"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <Textarea
          label="Description"
          placeholder="Describe your project in detail. What do you need? What are the requirements?"
          rows={6}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Select label="Category" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select a category</option>
          {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </Select>

        <div className="grid grid-cols-2 gap-4">
          <Input label="Budget Min ($)" type="number" placeholder="500" value={budgetMin} onChange={(e) => setBudgetMin(e.target.value)} />
          <Input label="Budget Max ($)" type="number" placeholder="2000" value={budgetMax} onChange={(e) => setBudgetMax(e.target.value)} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input label="Deadline" placeholder="e.g. 30 days" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
          <Select label="Experience Level" value={experience} onChange={(e) => setExperience(e.target.value)}>
            <option value="Entry">Entry</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Expert">Expert</option>
          </Select>
        </div>

        {/* Skills */}
        <div>
          <label className="block text-sm font-medium text-ink-700 dark:text-ink-200 mb-1.5">Required Skills</label>
          <div className="flex gap-2 mb-2">
            <div className="flex-1 relative">
              <Tag className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
              <input
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addSkill(); } }}
                placeholder="Type a skill and press Enter"
                className="w-full h-11 rounded-xl border border-ink-200 dark:border-ink-800 bg-white dark:bg-ink-900 pl-10 pr-4 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
              />
            </div>
            <Button type="button" variant="outline" onClick={addSkill}>Add</Button>
          </div>
          {skills.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {skills.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSkills(skills.filter((x) => x !== s))}
                  className="inline-flex items-center gap-1"
                >
                  <Badge variant="primary">{s} ✕</Badge>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-3 pt-4 border-t border-ink-200 dark:border-ink-800">
          <Button type="button" variant="outline" className="flex-1" onClick={() => navigate('/jobs')}>Cancel</Button>
          <Button type="submit" className="flex-1"><Send className="w-4 h-4" /> Post Job</Button>
        </div>
      </form>
    </div>
  );
}
