import { useState } from "react";
import { Calendar } from "../ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { CalendarCheck, Clock, User, BookOpen, Plus, Edit, Trash2 } from "lucide-react";
import { format, isSameDay } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner";

interface Agendamento {
  id: string;
  data: Date;
  horarioInicio: string;
  horarioFim: string;
  professor: string;
  turma: string;
  atividade: string;
  observacoes?: string;
  status: "confirmado" | "pendente" | "cancelado";
}

// Mock data inicial
const mockAgendamentos: Agendamento[] = [
  {
    id: "1",
    data: new Date(2026, 3, 28),
    horarioInicio: "08:00",
    horarioFim: "10:00",
    professor: "Prof. João Silva",
    turma: "3º Ano A",
    atividade: "Prática de Química - Estados da Matéria",
    status: "confirmado"
  },
  {
    id: "2",
    data: new Date(2026, 3, 30),
    horarioInicio: "14:00",
    horarioFim: "16:00",
    professor: "Prof. João Silva",
    turma: "2º Ano B",
    atividade: "Experimento sobre Cadeia Alimentar",
    status: "confirmado"
  },
  {
    id: "3",
    data: new Date(2026, 4, 5),
    horarioInicio: "10:00",
    horarioFim: "12:00",
    professor: "Prof. Maria Santos",
    turma: "1º Ano C",
    atividade: "Observação de Células",
    status: "confirmado"
  }
];

const horarios = [
  "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00"
];

export function AgendamentosManagement() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>(mockAgendamentos);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingAgendamento, setEditingAgendamento] = useState<Agendamento | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    data: new Date(),
    horarioInicio: "08:00",
    horarioFim: "10:00",
    professor: "",
    turma: "",
    atividade: "",
    observacoes: "",
    status: "pendente" as const
  });

  // Filtra agendamentos da data selecionada
  const agendamentosDoDia = selectedDate
    ? agendamentos.filter(ag => isSameDay(new Date(ag.data), selectedDate))
    : [];

  // Pega datas com agendamentos para destacar no calendário
  const datasComAgendamentos = agendamentos.map(ag => new Date(ag.data));

  const handleOpenDialog = (agendamento?: Agendamento) => {
    if (agendamento) {
      setEditingAgendamento(agendamento);
      setFormData({
        data: new Date(agendamento.data),
        horarioInicio: agendamento.horarioInicio,
        horarioFim: agendamento.horarioFim,
        professor: agendamento.professor,
        turma: agendamento.turma,
        atividade: agendamento.atividade,
        observacoes: agendamento.observacoes || "",
        status: agendamento.status
      });
    } else {
      setEditingAgendamento(null);
      setFormData({
        data: selectedDate || new Date(),
        horarioInicio: "08:00",
        horarioFim: "10:00",
        professor: "",
        turma: "",
        atividade: "",
        observacoes: "",
        status: "pendente"
      });
    }
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!formData.professor || !formData.turma || !formData.atividade) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    if (editingAgendamento) {
      // Editar agendamento existente
      setAgendamentos(prev =>
        prev.map(ag =>
          ag.id === editingAgendamento.id
            ? { ...ag, ...formData }
            : ag
        )
      );
      toast.success("Agendamento atualizado com sucesso!");
    } else {
      // Criar novo agendamento
      const novoAgendamento: Agendamento = {
        id: Date.now().toString(),
        ...formData
      };
      setAgendamentos(prev => [...prev, novoAgendamento]);
      toast.success("Agendamento criado com sucesso!");
    }

    setDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este agendamento?")) {
      setAgendamentos(prev => prev.filter(ag => ag.id !== id));
      toast.success("Agendamento excluído com sucesso!");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmado":
        return "bg-green-500/10 text-green-700 border-green-500/20";
      case "pendente":
        return "bg-yellow-500/10 text-yellow-700 border-yellow-500/20";
      case "cancelado":
        return "bg-red-500/10 text-red-700 border-red-500/20";
      default:
        return "bg-gray-500/10 text-gray-700 border-gray-500/20";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "confirmado":
        return "Confirmado";
      case "pendente":
        return "Pendente";
      case "cancelado":
        return "Cancelado";
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gerenciar Reservas</h1>
          <p className="text-gray-600 mt-2">
            Gerencie os agendamentos do laboratório e organize as aulas práticas
          </p>
        </div>
        <Button
          onClick={() => handleOpenDialog()}
          className="bg-green-600 hover:bg-green-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Novo Agendamento
        </Button>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calendário */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarCheck className="h-5 w-5 text-green-600" />
              Calendário
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              locale={ptBR}
              className="rounded-md border"
              modifiers={{
                agendado: datasComAgendamentos
              }}
              modifiersStyles={{
                agendado: {
                  fontWeight: 'bold',
                  backgroundColor: 'rgb(34 197 94 / 0.1)',
                  color: 'rgb(22 163 74)'
                }
              }}
            />
          </CardContent>
        </Card>

        {/* Agendamentos do Dia */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-purple-600" />
              {selectedDate
                ? format(selectedDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
                : "Selecione uma data"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {agendamentosDoDia.length === 0 ? (
              <div className="text-center py-12">
                <CalendarCheck className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 mb-4">
                  {selectedDate
                    ? "Nenhum agendamento para esta data"
                    : "Selecione uma data no calendário"}
                </p>
                {selectedDate && (
                  <Button
                    onClick={() => handleOpenDialog()}
                    variant="outline"
                    className="border-green-600 text-green-600 hover:bg-green-50"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Criar Agendamento
                  </Button>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                {agendamentosDoDia.map((agendamento) => (
                  <Card key={agendamento.id} className="border-l-4 border-l-green-500">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span className="font-medium text-gray-900">
                            {agendamento.horarioInicio} - {agendamento.horarioFim}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(agendamento.status)}>
                            {getStatusLabel(agendamento.status)}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleOpenDialog(agendamento)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(agendamento.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-gray-700">
                          <User className="h-4 w-4 text-gray-500" />
                          <span className="font-medium">{agendamento.professor}</span>
                          <span className="text-gray-500">•</span>
                          <span>{agendamento.turma}</span>
                        </div>
                        <div className="flex items-start gap-2 text-gray-700">
                          <BookOpen className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                          <span>{agendamento.atividade}</span>
                        </div>
                        {agendamento.observacoes && (
                          <p className="text-gray-600 text-xs mt-2 pl-6">
                            {agendamento.observacoes}
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Dialog de Criar/Editar */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingAgendamento ? "Editar Agendamento" : "Novo Agendamento"}
            </DialogTitle>
            <DialogDescription>
              Preencha as informações do agendamento do laboratório
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="horarioInicio">Horário de Início *</Label>
                <Select
                  value={formData.horarioInicio}
                  onValueChange={(value) => setFormData({ ...formData, horarioInicio: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {horarios.map((h) => (
                      <SelectItem key={h} value={h}>{h}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="horarioFim">Horário de Término *</Label>
                <Select
                  value={formData.horarioFim}
                  onValueChange={(value) => setFormData({ ...formData, horarioFim: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {horarios.map((h) => (
                      <SelectItem key={h} value={h}>{h}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="professor">Professor *</Label>
              <Input
                id="professor"
                placeholder="Nome do professor"
                value={formData.professor}
                onChange={(e) => setFormData({ ...formData, professor: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="turma">Turma *</Label>
              <Input
                id="turma"
                placeholder="Ex: 3º Ano A"
                value={formData.turma}
                onChange={(e) => setFormData({ ...formData, turma: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="atividade">Atividade *</Label>
              <Input
                id="atividade"
                placeholder="Descrição da atividade a ser realizada"
                value={formData.atividade}
                onChange={(e) => setFormData({ ...formData, atividade: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="observacoes">Observações</Label>
              <Textarea
                id="observacoes"
                placeholder="Informações adicionais (opcional)"
                value={formData.observacoes}
                onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: any) => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="confirmado">Confirmado</SelectItem>
                  <SelectItem value="pendente">Pendente</SelectItem>
                  <SelectItem value="cancelado">Cancelado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancelar
            </Button>
            <Button
              onClick={handleSave}
              className="bg-green-600 hover:bg-green-700"
            >
              {editingAgendamento ? "Salvar Alterações" : "Criar Agendamento"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
